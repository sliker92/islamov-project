var playerDoc = document.querySelector('.player');
var player = new Player(playerDoc);
document.addEventListener('keydown', checkButton);
document.addEventListener('keyup', player.playerStop);
document.addEventListener('onclick', player.shoot);
// document.addEventListener('mousemove', mouseFollow);

function Player(selector) {
  var self = this;
  self.player = selector;
  self.posX = 0;
  self.posY = 0;
  self.speedX = 0;
  self.speedY = 0;
  self.health = 100;
  self.boolets = 8;
  self.rotate = 0;
  self.takeItem = function () {

  };
  self.shoot = function () {
    self.boolets--;
  };
  self.reloadWeapon = function () {

  };
  self.update = function() {
    self.player.style.transform = 'translateX(' + self.posX + 'px) translateY(' + self.posY + 'px) translateZ(0)';
  };
  self.playerMove = function () {
    self.posX += self.speedX;
    self.posY += self.speedY;
  };
  self.playerStop = function () {
    self.speedX = 0;
    self.speedY = 0;
  };
  self.checkLimit = function () {
    if (self.posY < 0) {
      self.posY = 0;
    }
    if (self.posY > innerHeight - playerDoc.offsetHeight - 15) {
      self.posY = innerHeight - playerDoc.offsetHeight - 15;
    }
    if (self.posX < 0) {
      self.posX = 0;
    }
    if (self.posX > innerWidth - playerDoc.offsetWidth) {
      self.posX = innerWidth - playerDoc.offsetWidth;
    }
  };
}

function checkButton(EO) {
  EO = EO || window.event;
  if (EO.keyCode === 87) {
    player.speedY = -6;
    player.speedX = 0;
  }
  if (EO.keyCode === 83) {
    player.speedY = 6;
    player.speedX = 0;
  }
  if (EO.keyCode === 65) {
    player.speedY = 0;
    player.speedX = -6;
  }
  if (EO.keyCode === 68) {
    player.speedY = 0;
    player.speedX = 6;
  }
}

// function mouseFollow(EO) {
//   var playerCenter = getCenter();
//   var angle = Math.atan2(EO.clientX - playerCenter.x, -(EO.clientY - playerCenter.y)) * (180 / Math.PI);
//   playerDoc.style.transform = 'rotate(' + angle + 'deg)';
// }
//
// function getCenter() {
//   var x = playerDoc.offsetLeft;
//   var y = playerDoc.offsetTop;
//   return {
//     x: x,
//     y: y
//   };
// }

function gameStart() {
  player.update();
  player.checkLimit();
  player.playerMove();
  // mouseFollow();
  requestAnimationFrame(gameStart);
}

gameStart();
