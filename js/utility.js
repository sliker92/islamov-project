(function (window) {
  function createEnemies() {
    for (let i = 0; i < 5; i++) {
      enemy[i] = document.createElement('img');
      enemy[i].id = 'enemy' + i;
      enemy[i].className = 'enemy';
      enemy[i].setAttribute('src', 'img/zombie_easy.png');
      enemy[i].setAttribute('alt', '#');
      enemysArray.push((new Enemy(enemy[i].id, Math.random() * innerWidth, Math.random() * innerHeight,
        shooter.getRandomArbitrary(-1, 1), shooter.getRandomArbitrary(-1, 1))));
      $('.game_wrapper').append(enemy[i]);
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.createEnemies = createEnemies;
})(window);

(function (window) {
  function checkPlayerLimits() {
    if (player.posY < 0) {
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

  window.shooter = window.shooter || {};
  window.shooter.checkPlayerLimits = checkPlayerLimits;
})(window);

(function (window) {
  function checkEnemiesLimit() {
    for (let i = 0; i < enemysArray.length; i++) {
      if (enemysArray[i].posY < 0) {
        enemysArray[i].posY = 0;
        enemysArray[i].speedY = shooter.getRandomArbitrary(-1, 1);
        enemysArray[i].speedX = shooter.getRandomArbitrary(-1, 1);
      }
      if (enemysArray[i].posY > innerHeight - 45) {
        enemysArray[i].posY = innerHeight - 45;
        enemysArray[i].speedY = shooter.getRandomArbitrary(-1, 1);
        enemysArray[i].speedX = shooter.getRandomArbitrary(-1, 1);
      }
      if (enemysArray[i].posX < 0) {
        enemysArray[i].posX = 0;
        enemysArray[i].speedY = shooter.getRandomArbitrary(-1, 1);
        enemysArray[i].speedX = shooter.getRandomArbitrary(-1, 1);
      }
      if (enemysArray[i].posX > innerWidth - playerDoc.offsetWidth) {
        enemysArray[i].posX = innerWidth - playerDoc.offsetWidth;
        enemysArray[i].speedY = shooter.getRandomArbitrary(-1, 1);
        enemysArray[i].speedX = shooter.getRandomArbitrary(-1, 1);
      }
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkEnemiesLimit = checkEnemiesLimit;
})(window);

(function (window) {
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
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkBulletLimits = checkBulletLimits;
})(window);

(function (window) {
  function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 ||
      b <= y2 || y > b2);
  }

  window.shooter.collides = collides;
})(window);

(function (window) {
  function boxCollides(enemyposX, enemyposY, enemywidth, enemyheight, palyerposX, playerposY, playerwidth, playerheight) {
    return shooter.collides(enemyposX, enemyposY,
      enemyposX + enemywidth, enemyposY + enemyheight,
      palyerposX, playerposY,
      palyerposX[0] + playerwidth, playerposY + playerheight);
  }

  window.shooter = window.shooter || {};
  window.shooter.boxCollides = boxCollides;
})(window);

(function (window) {
  function checkCollisions() {
    for (var i = 0; i < enemysArray.length; i++) {
      for (var j = 0; j < bulletsArray.length; j++) {
        if (shooter.boxCollides(Math.round(enemysArray[i].posX), Math.round(enemysArray[i].posY), 12, 12, bulletsArray[j].posX, bulletsArray[j].posY, 12, 12)) {
          enemysArray.splice(i, 1);
          $('#enemy' + i).fadeOut();
          $('#enemy' + i).remove();
          i--;
          player.score += 100;
          bulletsArray.splice(j, 1);
          $('.bullet').remove();
          break;
        }
      }
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkCollisions = checkCollisions;
})(window);

(function (window) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  window.shooter = window.shooter || {};
  window.shooter.getRandomArbitrary = getRandomArbitrary;
})(window);

(function (window) {
  function gameScore() {
    $('#bullets_content')[0].innerHTML = player.bullets;
    $('#score_content')[0].innerHTML = 'score: ' + player.score;
  }

  window.shooter = window.shooter || {};
  window.shooter.gameScore = gameScore;
})(window);
