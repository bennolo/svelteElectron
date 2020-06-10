const {app, BrowserWindow} = require ('electron');

const production = !process.env.ELECTRON_RELOAD;

if (!production) {
  const path = require ('path');
  require ('electron-reload') (__dirname, {
    electron: path.join (__dirname, 'node_modules', '.bin', 'electron'),
    awaitWriteFinish: true,
  });
}

let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow ({
    width: 980,
    height: 680,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.setMenuBarVisibility (false);
  //mainWindow.webContents.openDevTools()

  mainWindow.loadFile ('public/index.html');

  mainWindow.on ('closed', function () {
    mainWindow = null;
  });
}

app.on ('ready', createWindow);

app.on ('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit ();
});

app.on ('activate', function () {
  if (mainWindow === null) createWindow ();
});
