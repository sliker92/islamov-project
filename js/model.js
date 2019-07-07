const playerDoc = document.querySelector('.player'); //  картинка игрока
let enemysArray = []; // добавляются враги
let enemy = []; // добавляются враги картники
let bulletsArray = []; // добавляются пули при выстреле

// Основной класс, от которого создаются другие классы
class Entity {
  constructor(classname, posX, posY, speedX, speedY) {
    this.classname = classname;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
  }
  move = function () {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };
}

//  Класс игрок, который принимает класс, и позицию в игре
class Player extends Entity {
  constructor(classname, posX, posY, speedX, speedY) {
    super(classname, posX, posY, speedX, speedY);
    this.position = 'left';
    this.bullets = 8;
  }
  stop = function () {
    this.speedX = 0;
    this.speedY = 0;
  };
  shoot = function () {
    this.bullets -= 1;
    if (this.bullets < 1) this.bullets = 0;
    console.log(this.bullets);
  };
  reloadWeapon = function () {
    setTimeout( function () {
      player.bullets = 8;
    }, 1000 );
  };
}

//  Класс враг, который принимает класс, и позицию в игре
class Enemy extends Entity {
  move = function () {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };
}

//  Класс Пуля, который принимает класс, и позицию в игре
class Bullet extends Entity {
  constructor(classname, posX, posY, speedX, speedY) {
    super(classname, posX, posY, speedX, speedY);
  }
}

//  Создаём игрока и распологаем его по центру
let player = new Player(playerDoc, window.innerWidth / 2, window.innerHeight / 2,0,0);

//  создаём врагов и пушим их в массив enemyArray
for (let i = 0; i < 30; i++) {
  enemy[i] = document.createElement('img');
  enemy[i].id = 'enemy' + i;
  enemy[i].setAttribute('src', 'img/zombie_easy.png');
  enemy[i].setAttribute('alt', '#');
  enemysArray.push((new Enemy(enemy[i].id, Math.random() * (innerWidth / 2 - 50), Math.random() * innerHeight - 50, 1, 1)));
  $('.game_wrapper').append(enemy[i]);
}


