<script>
  import { tournament, club, date } from "./store.js";

  window.addEventListener("load", startup);

  function startup() {
    document.getElementById("tourn").addEventListener("keyup", function(event) {
      if (event.keyCode == 13) {
        document.getElementById("club").focus();
      }
    });
  }
</script>

<style> 
  input {
    width: 25%;
    padding: 5px;
    margin-right: 10px;
    color: rgb(74, 74, 173);
    font-size: 14px;
    font-weight: bold;
  }

  img {
    padding: 5px;
    margin-right: 10px;
    transform: scale(0.7);
    position: absolute;
    top: -5px;
  }

</style>

<div class="headerDiv">
  <input
    id="tourn"
    type="text"
    placeholder="Tournament"
    bind:value={$tournament}
    on:input|preventDefault={startup} />

  <input id="club" type="text" placeholder="Club" bind:value={$club} />
  <input id="date" type="date" placeholder="date" bind:value={$date} />
  <img src="../public/apps_printer_15747.ico" alt="print" onclick="window.print()">
</div>

<hr />
