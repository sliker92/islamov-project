const playerDoc = document.querySelector('.player');
let enemysArray = [];
let enemy = [];

//  Класс игрок, который принимает картинку врага как аргумент

class Player {
  constructor(selector, posX, posY) {
    this.player = selector;
    this.posX = posX;
    this.posY = posY;
    this.speedX = 0;
    this.speedY = 0;
    this.health = 100;
    this.boolets = 8;
    this.rotate = 0;
  }
  takeItem = function () {

  };
  shoot = function () {

  };
  reloadWeapon = function () {

  };
  playerMove = function () {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };
  playerStop = function () {
    this.speedX = 0;
    this.speedY = 0;
  };
}

//  Класс враг, который принимает картинку врага как аргумент

class Enemy {
  constructor(selector, posX, posY) {
    let self = this;
    self.enemy = selector;
    self.posX = posX;
    self.posY = posY;
    self.speedX = 1;
    self.speedY = 1;
    self.health = 100;
    self.rotate = 0;
  }
  update = function () {
    // $('.selector').css('translateX(' + self.posX + 'px) translateY(' + self.posY + 'px) translateZ(0)');
    // $(selector).style.transform = 'translateX(' + self.posX + 'px) translateY(' + self.posY + 'px) translateZ(0)';
  };
  enemyMove = function () {
    self.posX += self.speedX;
    self.posY += self.speedY;
  };
  enemyStop = function () {
    self.speedX = 0;
    self.speedY = 0;
  };
  checkLimit = function () {
    if (self.posY < 0) {
      self.posY = 0;
    }
    if (self.posY > innerHeight - 22 - 15) {
      self.posY = innerHeight - 22 - 15;
    }
    if (self.posX < 0) {
      self.posX = 0;
    }
    if (self.posX > innerWidth - 16) {
      self.posX = innerWidth - 16;
    }
  };
}

let player = new Player(playerDoc, window.innerWidth / 2, window.innerHeight / 2);

//  создаём врагов и пушим их в массив enemyArray

for (let i = 0; i < 30; i++) {
  enemy[i] = document.createElement('img');
  enemy[i].id = 'enemy' + i;
  enemy[i].setAttribute('src', 'img/zombie_easy.png');
  enemy[i].setAttribute('alt', '#');
  enemysArray.push((new Enemy(enemy[i].id, Math.random() * innerWidth, Math.random() * innerHeight)));
  $('.game_wrapper').append(enemy[i]);
}

