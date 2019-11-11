window.onhashchange = SwitchToStateFromURLHash;

let SPAStateH = {};

function SwitchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let StateJSON = decodeURIComponent(URLHash.substr(1));

  if (StateJSON !== '') {
    SPAStateH = JSON.parse(StateJSON);
  } else {
    SPAStateH = {pagename: 'Main'};// иначе показываем главную страницу
  }
  if (SPAStateH == {pagename: 'Main'}) {
    pageReload();
  }
  let PageHTML = '';

  switch (SPAStateH.pagename) {
  case 'Main':
    PageHTML += `<audio src='sounds/menu.mp3'></audio>
                <canvas id="background_canvas" style="position: absolute"></canvas>
                <script src="js/background_canvas.js"></script>
                <main>
                <div class="content_wrapper">
                <h1 class="game_name">Shooter zombie killer</h1>
                <ul class="menu_list">
                <li><input type="button" class="menu_game-start" value="New game" onclick = 'SwitchToGame()'></li>
                <li><input type="button" class="menu_records" value="Records" onclick = 'SwitchToRecords()'></li>
                </ul>
                </div>
                <main>
                <footer>
                <div class=\"made-by_wrapper\">
                <span class=\"made-by\">made by</span>
                <a href="#"><img src="img/vk-logo.svg" alt="vk page" href="https://vk.com/idbobkoo" class="logo"></a>
                </div> 
                </footer>`;
    break;
  case 'Game':
    PageHTML += `<header>
                    <img alt="#" class="bullets" src="img/bullets.png">
                    <span id="bullets_content"></span>
                    <span id="score_content"></span>
                </header>
                <div class="game_wrapper">
                    <img class="player" src="img/player-l.png" alt="#">
                </div>
                <div class="game_over"> 
                    <label for="input">score</label>
                    <input type="text" placeholder="Enter your name">
                    <input type="button" class="menu_records" value="ok" onclick="setRecord()">
                </div>
                <script src="js/utils.js"></script>
                <script src="js/model.js"></script>
                <script src="js/view.js"></script>
                <script src="js/events.js"></script>`;
    break;
  case 'Records':
    PageHTML += `<canvas id="background_canvas" style="position: absolute"></canvas>
      <script src="js/background_canvas.js"></script>
      <div class="records_wrapper">
      <h3>Records</h3>
      <ul class="records_list">
        <li>1. <span class="record_name1">no name</span> | points:<span class="record_points1">0000</span> </li>
        <li>2. <span class="record_name2">no name</span> | points:<span class="record_points2">0000</span> </li>
        <li>3. <span class="record_name3">no name</span> | points:<span class="record_points3">0000</span> </li>
        <li>4. <span class="record_name4">no name</span> | points:<span class="record_points4">0000</span> </li>
      </ul>
      </div>`;
    break;
  }
  document.querySelector('body').innerHTML = PageHTML;
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
  pageReload();
}

function SwitchToGame() {
  SwitchToState({pagename: 'Game'});
}

function SwitchToRecords() {
  $(function () {
    $(document).ready(function () {
      $.getScript('js/background_canvas.js');
    });
  });
  SwitchToState({pagename: 'Records'});
}

SwitchToStateFromURLHash();

let pageReload = () => {
  document.location.reload(true);
};
