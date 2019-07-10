function checkButton(EO) {
  EO = EO || window.event;

  // проверяем на нажатие кнопки действий игрока
  if (EO.keyCode === 87) {
    $('.player').attr('src', 'img/player-u.png');  // направление картинки игрока
    player.position = 'up';
    player.speedY = -6;
    player.speedX = 0;
    player.move();
  }
  if (EO.keyCode === 83) {
    $('.player').attr('src', 'img/player-d.png');  // направление картинки игрока
    player.position = 'down';
    player.speedY = 6;
    player.speedX = 0;
    player.move();
  }
  if (EO.keyCode === 65) {
    $('.player').attr('src', 'img/player-l.png');  // направление картинки игрока
    player.position = 'left';
    player.speedY = 0;
    player.speedX = -6;
    player.move();
  }
  if (EO.keyCode === 68) {
    $('.player').attr('src', 'img/player-r.png');  // направление картинки игрока
    player.position = 'right';
    player.speedY = 0;
    player.speedX = 6;
    player.move();
  }
  if (EO.keyCode === 32) {
    player.shoot();
    if (player.bullets > 0) {
      bulletDirection();
    }
  }
  if (EO.keyCode === 82) {
    player.reloadWeapon();
  }
}

function bulletDirection() {
  // let classNumber = 'bullet1';
  // for (let index; index <= 10; i++) {
  //   if (classNumber.substr(classNumber.length - 1) == index) {
  //     classNumber = "bullet" + toString(index + 1);
  //   };
  // }

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
  window.addEventListener('keydown', checkButton);
  window.addEventListener('keyup', player.stop);
  window.addEventListener('onclick', player.shoot);
  render();
  requestAnimFrame(gameStart);
}

gameStart();
