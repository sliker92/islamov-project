window.onhashchange = SwitchToStateFromURLHash;

let SPAStateH = {};

function SwitchToStateFromURLHash() {
  let URLHash = window.location.hash;
  let StateJSON = decodeURIComponent(URLHash.substr(1));

  if ( StateJSON !== '' ) {
    SPAStateH = JSON.parse(StateJSON);
  } else {
    SPAStateH = {pagename: 'Main'}; // иначе показываем главную страницу
  }
  let PageHTML = '';

  switch (SPAStateH.pagename) {
  case 'Main':
    PageHTML += "<canvas id=\"background_canvas\" style=\"position: absolute\"></canvas>";
    PageHTML += "<script>\n" +
      "  function LoadScript () {\n" +
      "    $.ajax(\"js/background_canvas.js\",\n" +
      "      { type:'GET', dataType:'script', success:DataLoaded, error:ErrorHandler }\n" +
      "    );\n" +
      "  }\n" +
      "\n" +
      "  function DataLoaded(data) {\n" +
      "    console.log('script подгружен');\n" +
      "  }\n" +
      "\n" +
      "  function ErrorHandler(jqXHR,StatusStr,ErrorStr) {\n" +
      "    alert(StatusStr+' '+ErrorStr);\n" +
      "  }\n" +
      "\n" +
      "  document.addEventListener('DOMContentLoaded', LoadScript, false);\n" +
      "\n" +
      "</script>";
    PageHTML += "<script src=\"js/background_canvas.js\"></script>";
    PageHTML += "<main>";
    PageHTML += "<div class=\"content_wrapper\">";
    PageHTML += "<h1 class=\"game_name\">Shooter zombie killer</h1>";
    PageHTML += "<ul class=\"menu_list\">";
    PageHTML += "<li><a class=\"menu_game-start\" href=\"#\" onmousedown = 'SwitchToGame()'>New game</a></li>";
    PageHTML += "<li><a class=\"menu_records\" href=\"#\" onmousedown = 'SwitchToRecords()'>Records</a></li>";
    PageHTML += "</ul>";
    PageHTML += "</div>";
    PageHTML += "</main>";
    PageHTML += "<footer>";
    PageHTML += "<div class=\"made-by_wrapper\">";
    PageHTML += "<span class=\"made-by\">made by</span>";
    PageHTML += "<a href=\"#\"><img src=\"img/vk-logo.svg\" alt=\"vk page\" href=\"https://vk.com/idbobkoo\" class=\"logo\"></a>";
    PageHTML += "</div>";
    PageHTML += "</footer>";
    break;
  case 'Game':
    PageHTML += "<div class=\"game_wrapper\">\n" +
      "    <img class=\"player\" src=\"img/player-l.png\" alt=\"#\">\n" +
      "</div>";
    PageHTML += '<script src="js/utils.js"></script>';
    PageHTML += '<script src="js/model.js"></script>';
    PageHTML += '<script src="js/view.js"></script>';
    PageHTML += '<script src="js/events.js"></script>';
    break;
  case 'Records':
    PageHTML += "<h3>Records</h3>";
    break;
  }
  document.querySelector('body').innerHTML = PageHTML;
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(JSON.stringify(NewStateH));
}

function SwitchToGame() {
  SwitchToState( { pagename: 'Game' } );
}

function SwitchToRecords() {
  SwitchToState( { pagename: 'Records' } );
}

SwitchToStateFromURLHash();

