function render() {
  // отрисовываем количество пуль и очки
  score();

  // обновляем положение игрока
  $('.player').css('transform', `translateX(${player.posX}px) translateY(${player.posY}px) translateZ(0px)`);
  checkPlayerLimits();

  // обновляем положение врагов

  for (var i = 0; i < enemysArray.length; i++) {
    var x0 = enemysArray[i].posX;
    var y0 = enemysArray[i].posY;
    var x1 = player.posX;
    var y1 = player.posY;
    var c = 1;
    var l = Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));

    enemysArray[i].posX += (x1 - x0) * c / l;
    enemysArray[i].posY += (y1 - y0) * c / l;
    enemysArray[i].move();
    $('#enemy' + i).css('transform', `translateX(${enemysArray[i].posX}px) translateY(${enemysArray[i].posY}px) translateZ(0px)`);
  }
  // for (let i = 0; i < enemysArray.length; i++) {


  //   // enemysArray[i].move();
  // }
  checkEnemyLimit();

  // обновляем движение пули
  for (let i = 0; i < bulletsArray.length; i++) {
    $('.bullet').css('transform', `translateX(${bulletsArray[i].posX}px) translateY(${bulletsArray[i].posY}px) translateZ(0px)`);
    bulletsArray[i].move();
  }
  checkBulletLimits();
}

function score() {
  $('#bullets_content')[0].innerHTML = player.bullets;
  $('#score_content')[0].innerHTML = 'score: ' + player.score;
}

function checkPlayerLimits() {
  if (player.posY  < 0) {
    player.posY = 0;
  }
  if (player.posY > innerHeight - playerDoc.offsetHeight - 15) {
    player.posY = innerHeight - playerDoc.offsetHeight - 15;
  }
  if (player.posX < 0) {
    player.posX = 0;
  }
  if (player.posX > innerWidth - playerDoc.offsetWidth) {
    player.posX = innerWidth - playerDoc.offsetWidth;
  }
}

function checkEnemyLimit() {
  for (let i = 0; i < enemysArray.length; i++) {
    if (enemysArray[i].posY < 0) {
      enemysArray[i].posY = 0;
    }
    if (enemysArray[i].posY > innerHeight - 45) {
      enemysArray[i].posY = innerHeight - 45;
    }
    if (enemysArray[i].posX < 0) {
      enemysArray[i].posX = 0;
    }
    if (enemysArray[i].posX > innerWidth - playerDoc.offsetWidth) {
      enemysArray[i].posX = innerWidth - playerDoc.offsetWidth;
    }
  }
}

function checkBulletLimits() {
  for (let i = 0; i < bulletsArray.length; i++) {
    if (bulletsArray[i].posY < -50) {
      bulletsArray.splice(i, 1);
      $('.bullet').remove();
      break;
    }
    if (bulletsArray[i].posY > innerHeight - 15) {
      bulletsArray.splice(i, 1);
      $('.bullet').remove();
      break;
    }
    if (bulletsArray[i].posX < 0) {
      bulletsArray.splice(i, 1);
      $('.bullet').remove();
      break;
    }
    if (bulletsArray[i].posX > innerWidth - 15) {
      bulletsArray.splice(i, 1);
      $('.bullet').remove();
      break;
    }
    for (let j = 0; j < enemysArray.length; j++) {
      if (bulletsArray[i].posY & bulletsArray[i].posX == enemysArray[i].posY & enemysArray[i].posX) {
        enemysArray.splice(i, 1);
        $('.enemy' + i).remove();
        $('.bullet').remove();
        break;
      }
    }
  }
}