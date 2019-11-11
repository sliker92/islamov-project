/**
 * добавляются враги методом push
 * @type {Array} - массив объектов
 */
let enemysArray = [];
/**
 * добавляются справйты врагов методом push
 * @type {Array}- массив объектов
 */
let enemy = [];
/**
 * добавляются пули при выстреле методом push
 * @type {Array} - массив объектов
 */
let bulletsArray = [];

class Entity {
  /**
   *@description основной класс сущности, он которого наследуются остальные классы игры
   * @param {object} classname элемент DOM
   * @param {number} posX позиция по оси Х
   * @param {number} posY позиция по оси Y
   * @param {number} speedX скорость по оси Х
   * @param {number} speedY скорость по оси Y
   */
  constructor(classname, posX, posY, speedX, speedY) {
    this.classname = classname;
    this.posX = posX;
    this.posY = posY;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  /**
   * @description увеличивает позицию игрока по осям X и Y
   */
  move = function () {
    this.posX += this.speedX;
    this.posY += this.speedY;
  };
}

/**
 * @description Класс игрок, который принимает класс, и позицию в игре
 */
class Player extends Entity {
  constructor(classname, posX, posY, speedX, speedY) {
    super(classname, posX, posY, speedX, speedY);
    this.position = 'left';
    this.bullets = 8;
    this.score = 0;
  }

  // stop = function () {
  //   this.speedX = 0;
  //   this.speedY = 0;
  // };

  /**
   * @description управляет количеством пуль
   */
  shoot = function () {
    this.bullets -= 1;
    if (this.bullets < 1) this.bullets = 0;
  };

  /**
   * @description перезаржает оружие игрока с паузой после события нажатия кнопки
   */
  reloadWeapon = function () {
    setTimeout(function () {
      player.bullets = 8;
    }, 1000);
  };
}

/**
 * @description Класс враг, который принимает класс, и позицию в игре
 */
class Enemy extends Entity {
}

/**
 * @description Класс Пуля, который принимает класс, и позицию в игре
 */
class Bullet extends Entity {
  constructor(classname, posX, posY, speedX, speedY) {
    super(classname, posX, posY, speedX, speedY);
  }
}

/**
 * Создаём игрока и распологаем его по центру
 * @type {Player}
 */
let player = new Player($('.player'), window.innerWidth / 2, window.innerHeight / 2, 0, 0);


// UI

/**
 * @description  функция отрисовывает всё происходящее в игре
 */
function render() {
  // отрисовываем количество пуль и очки
  $('#bullets_content')[0].innerHTML = player.bullets;
  $('#score_content')[0].innerHTML = 'score: ' + player.score;

  // обновляем положение игрока
  $('.player').css('transform', `translateX(${player.posX}px) translateY(${player.posY}px) translateZ(0px)`);
  shooter.checkPlayerLimits(player);
  shooter.checkContact(enemysArray, bulletsArray, enemy, player);

  // обновляем положение врагов
  for (let i = 0; i < enemysArray.length; i++) {
    let angle = Math.atan2(player.posY - enemysArray[i].posY, player.posX - enemysArray[i].posX);
    enemysArray[i].posX = Math.cos(angle) * enemysArray[i].speedX + enemysArray[i].posX;
    enemysArray[i].posY = Math.sin(angle) * enemysArray[i].speedY + enemysArray[i].posY;
    enemysArray[i].move();
    shooter.checkEnemiesLimit(enemysArray[i]);
    $('.enemy' + i).css('transform', `translateX(${enemysArray[i].posX}px) translateY(${enemysArray[i].posY}px) translateZ(0px)`);
  }
  shooter.checkContact(enemysArray, bulletsArray, enemy, player);

  // обновляем положение пули
  for (let i = 0; i < bulletsArray.length; i++) {
    $('.bullet').css('transform', `translateX(${bulletsArray[i].posX}px) translateY(${bulletsArray[i].posY}px) translateZ(0px)`);
    bulletsArray[i].move();
    shooter.checkBulletLimits(bulletsArray, bulletsArray[i], '.bullet');
  }

  // проверяем все сущности на столкновения
  shooter.checkContact(enemysArray, bulletsArray, enemy, player);
}


// EVENTS

/**
 * @description Функции обработки keydown event
 * @param event - event - событие
 */
function checkButton(event) {
  event = event || window.event;

  if (event.keyCode === 87) {
    $('.player').attr('src', 'img/player-u.png');  // направление спрайта игрока
    player.position = 'up';
    player.speedY = -7;
    player.speedX = 0;
    player.move();
  }
  if (event.keyCode === 83) {
    $('.player').attr('src', 'img/player-d.png');  // направление спрайта игрока
    player.position = 'down';
    player.speedY = 7;
    player.speedX = 0;
    player.move();
  }
  if (event.keyCode === 65) {
    $('.player').attr('src', 'img/player-l.png');  // направление спрайта игрока
    player.position = 'left';
    player.speedY = 0;
    player.speedX = -7;
    player.move();
  }
  if (event.keyCode === 68) {
    $('.player').attr('src', 'img/player-r.png');  // направление спрайта игрока
    player.position = 'right';
    player.speedY = 0;
    player.speedX = 7;
    player.move();
  }
  if (event.keyCode === 32) {
    player.shoot();
    if (player.bullets > 0) {
      bulletDirection();
    }
  }
  if (event.keyCode === 82) {
    player.reloadWeapon();
  }
}

/**
 * @description создаёт карьинку пули и сущность пули и отрисовывет её перемещение в зависимости от направления игрока
 */
function bulletDirection() {
  if (player.position === 'left') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 10}px) translateY(${player.posY}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX, player.posY + 10, -6, 0)));
  }
  if (player.position === 'right') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 76}px) translateY(${player.posY}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX + 25, player.posY + 35, 6, 0)));
  }
  if (player.position === 'up') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX}px) translateY(${player.posY - 48}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX + 30, player.posY, 0, -6)));
  }
  if (player.position === 'down') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 30}px) translateY(${player.posY + 10}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX + 7, player.posY + 50, 0, 6)));
  }
}

function gameStart() {
  render();
  requestAnimationFrame(gameStart);
}

shooter.init();
setTimeout(shooter.gameOver, 30000);
gameStart();
