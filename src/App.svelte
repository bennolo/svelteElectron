<script>
  import { players, storeBtnId, allValuesPlusIndex } from "./store.js";
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Footer from "./Footer.svelte";

  let selectedBtnID = "";
  let btnRowCol = [];
  let allBtns = [];
  let x = 0;
  let y = 0;
  let btnId = "";
  let one = 0;
  let two = 0;
  let btnIdReversed = "btnIdReversed";
  let sbSumArray = new Float32Array(21);
  let place = [];
  let werteSet = new Set();
  let wert_old;
  const mouseOver = event => {
    let element = document.getElementById(event.srcElement.id);
    wert_old = element.innerHTML;
    element.innerHTML = event.srcElement.id;
  };
  const mouseOut = event => {
    let element = document.getElementById(event.srcElement.id);
    element.innerHTML = wert_old;
  };

  const setPlace = () => {
    let key;
    let playerIndex = [];
    $allValuesPlusIndex = []; //working with Store.js
    werteSet.clear();
    sumArray.forEach((element, index) => {
      if (sumArray[index] > 0 && element > 0) {
        let key = element * 1000000 + sbSumArray[index] * 100;
        werteSet.add(key);
        $allValuesPlusIndex.push([key, index]);
      }
      $allValuesPlusIndex.sort(function compare(a, b) {
        return b[0] - a[0];
      });
      let werte_sortiert = Array.from(werteSet);
      werte_sortiert.sort(function compare(a, b) {
        return b - a;
      });
      place = [];
      werte_sortiert.forEach((val, index) => {
        place.push({ wert: val, platz: null, playerarr: [] });
      });
      $allValuesPlusIndex.forEach((element, index) => {
        let item = place.find(item => item.wert === element[0]);
        item.playerarr.push(element[1]);
      });

      place.forEach((element, index) => {
        let player_arr_fuerAuswertung = element.playerarr;
      });
    });

    const platzArray = [
      20,
      19,
      18,
      17,
      16,
      15,
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      5,
      4,
      3,
      2,
      1
    ];

    const popMoreElements = function(n) {
      for (let x = 1; x < n; x++) {
        platzArray.pop();
      }
    };

    const getNextPlaceNumber = length => {
      let platzwert = 0;

      if (length === 1) {
        platzwert = platzArray.pop();
        return platzwert;
      }

      if (length > 1) {
        platzwert = platzArray.pop();
        popMoreElements(length);
        return platzwert;
      }
    };

    place.forEach((element, index) => {
      let laenge = element.playerarr.length;
      let platzwert = getNextPlaceNumber(laenge);
      element.platz = platzwert;
    });
    // first before set place  -  clear the old Values
    for (let i = 1; i <= 20; i++) {
      let placeBtnId = "place" + i;
      let btn = document.getElementById(placeBtnId);
      btn.innerHTML = "";
    }

    place.forEach(val => {
      val.playerarr.forEach(element => {
        let player = element;
        let html = document.getElementById("place" + player);
        html.innerHTML = val.platz;
      });
    });
  };

  let resultArray = [
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21)
  ];

  function setSB() {
    for (let row = 0; row < resultArray.length; row++) {
      resultArray[row].forEach((element, index) => {
        sbArray[row][index] = element * sumArray[index];
      });
    }
    for (let index = 1; index < 21; index++) {
      sbSumArray[index] = sbArray[index].reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }

  let sbArray = [
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21),
    new Float32Array(21)
  ];

  let sumArray = new Float32Array(21);

  function sumResultArray() {
    for (let i = 0; i < sumArray.length; i++) {
      sumArray[i] = resultArray[i].reduce(function(a, b) {
        return a + b;
      }, 0);
    }
  }

  function coloringBtns() {
    for (var i = 0; i < 400; i += 21) {
      allBtns[i].style.background = "darkblue";
      allBtns[i].removeEventListener("click", showBox, false);
    }
  }

  function getTableBtns() {
    allBtns = document.getElementsByClassName("tableBtn");
  }

  function setEventlisteners() {
    for (var i = 0; i < 400; i++)
      allBtns[i].addEventListener("click", function() {
        x = allBtns[i].event.clientX;
        y = allBtns[i].event.clientY;
      });
  }

  let numbers = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];

  let idArray = [];

  function setEventlistenersToPlayerInput() {
    let playerInput = document.getElementsByClassName("playerInput");
    for (let index = 0; index < playerInput.length; index++) {
      const element = playerInput[index];

      element.addEventListener("keyup", function(event) {
        let allInputs = document.getElementsByClassName("playerInput");
        let input = document.getElementById(event.srcElement.id);
        let tabindex = input.attributes.getNamedItem("tabindex").value;
        if (event.keyCode == 13 && tabindex < 20) {
          let nextElement = playerInput[index + 1].focus();
        }
      });
    }
  }

  function showBox() {
    let btn = document.getElementById(event.srcElement.id);
    x = event.clientX;
    y = event.clientY;
    btnId = btn.id;
    $storeBtnId = btn.id;
    btnRowCol = btnId.split(":");
    btnIdReversed = btnRowCol[1] + ":" + btnRowCol[0];
    one = btnRowCol[0];
    two = btnRowCol[1];
    let resultBox = document.getElementById("resultBox");
    resultBox.style.visibility = "visible";
    resultBox.style.top = y - 10 + "px";
    resultBox.style.left = x - 10 + "px";
  }

  function setFirsPlayerToOne() {
    var firstPlayer = document.getElementById(btnId);
    firstPlayer.innerHTML = 1;
    resultArray[one][two] = 1;
    setSecondPlayerToZero();
  }

  function setSecondPlayerToZero() {
    var secondPlayer = document.getElementById(btnIdReversed);
    secondPlayer.innerHTML = 0;
    resultArray[two][one] = 0;
    sumResultArray();
    hideResultBox();
  }

  const reset = () => {
    var firstPlayer = document.getElementById(btnId);
    var secondPlayer = document.getElementById(btnIdReversed);
    firstPlayer.innerHTML = "";
    secondPlayer.innerHTML = "";
    resultArray[one][two] = 0;
    resultArray[two][one] = 0;
    sumResultArray();
    hideResultBox();
  };

  function setRemis() {
    var firstPlayer = document.getElementById(btnId);
    var secondPlayer = document.getElementById(btnIdReversed);
    firstPlayer.innerHTML = "&frac12";
    secondPlayer.innerHTML = "&frac12";
    resultArray[one][two] = 0.5;
    resultArray[two][one] = 0.5;
    sumResultArray();
    hideResultBox();
  }

  function hideResultBox() {
    let box = document.getElementById("resultBox");
    box.style.visibility = "hidden";
  }

  let numberBtnArray = [];

  onMount(() => {
    getTableBtns();
    setTimeout(function() {
      coloringBtns();
      setEventlistenersToPlayerInput();
      var tid = setInterval(setSB, 1000);
      var tid1 = setInterval(setPlace, 2000);
    }, 500);
  });
</script>

<style>
  .leftNrBtn:hover {
    transform: scale(1.5);
  }
  .tableBtn {
    font-size: 0.9rem;
  }
  .tableBtn:hover {
    font-size: 40%;
    background-color: aqua;
    transform: scale(2);
  }
  .headButton {
    background-color: darkturquoise;
    width: 30px;
  }
  .pointsBtn {
    font-size: 1rem;
  }
  .placeBtn {
    width: 30px;
    font-size: 1rem;
  }
  .sbBtn {
    width: 50px;
    height: 20px;
  }
  input {
    width: 150px;
  }
  #resultBox {
    width: 200px;
    height: 40px;
    padding: 2px;
    border: 2px solid rgb(39, 20, 150);
    background-color: rgb(33, 36, 197, 0.8);
    position: absolute;
    visibility: hidden;
  }

  #resultBox button {
    font-size: 1rem;
    height: 30px;
  }

  #cancelBtn {
    background-color: red;
    color: aliceblue;
    border-radius: 10%;
  }
  #reset {
    background-image: url("../public/back.png");
    background-repeat: no-repeat;
    border-radius: 10%;
    scale: 0.9;
    width: 35px;
    height: 30px;
    position: relative;
    top: 10px;
  }
  input:focus {
    background-color: aquamarine;
  }
</style>

<Header />

<button style="width: 25px; height: 20px; opacity: 0.0" disabled />
<input type="text" placeholder="Playernames:" disabled />
{#each numbers as nr}
  <button class="headButton">{nr}</button>
{/each}
<button>Points</button>
<button style="width: 50px;">SB</button>
<button>Place</button>

<hr />
{#each numbers as nr}
  <div id={'div' + nr}>
    <button
      class="leftNrBtn"
      style="width: 25px; height: 20px;"
      id={'row' + nr}>
      {nr}
    </button>
    <input
      class="playerInput"
      tabindex={nr}
      id={'player' + nr}
      type="text"
      placeholder="Name"
      style="height:20px;"
      bind:value={$players[nr]} />
    {#each numbers as n}
      <button
        id={nr + ':' + n}
        style="width: 30px; height: 20px;"
        on:click={showBox}
        on:mouseover={mouseOver}
        on:mouseout={mouseOut}
        class="tableBtn" />
    {/each}
    <button
      id={'points' + nr}
      style="width: 55px; height: 20px;"
      class="pointsBtn">
      {#if sumArray[nr] != 0}{sumArray[nr]}{/if}
    </button>
    <button class="sbBtn" id={'sb' + nr}>
      {#if sbSumArray[nr] != 0}{sbSumArray[nr]}{/if}
    </button>
    <button
      class="placeBtn"
      id={'place' + nr}
      style="width: 40px; height: 20px;" />
  </div>
{/each}

<Footer />

<div id="resultBox">
  <label style="color: white; font-weight: bold">{$storeBtnId}</label>
  <button on:click={setFirsPlayerToOne}>1:0</button>
  <button on:click={setRemis}>&frac12;</button>
  <input type="button" on:click={reset} id="reset" />
  <button id="cancelBtn" on:click={hideResultBox}>
    <strong>x</strong>
  </button>
</div>
