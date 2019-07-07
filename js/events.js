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
  if (player.position === 'left') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 10}px) translateY(${player.posY + 160}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX, player.posY, -6, 0)));
  }
  if (player.position === 'right') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 76}px) translateY(${player.posY - 10}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX, player.posY, 6, 0)));
  }
  if (player.position === 'up') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 50}px) translateY(${player.posY - 48}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX, player.posY, 0, -6)));
  }
  if (player.position === 'down') {
    $('.game_wrapper').prepend($('<img>', {class: 'bullet', src: 'img/bullet.png'}));
    $('.bullet').css('transform', `translateX(${player.posX + 30}px) translateY(${player.posY + 10}px) translateZ(0px)`, 'position', 'relative');
    bulletsArray.push((new Bullet('bullet', player.posX, player.posY, 0, 6)));
  }
}
