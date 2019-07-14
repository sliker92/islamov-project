(function (window) {
  /**
   * @description создаёт врагов и вешает обработчик события на keydown при запуске игры
   */
  function init() {
    for (let i = 0; i < 5; i++) {
      enemy[i] = document.createElement('img');
      enemy[i].id = 'enemy';
      enemy[i].className = 'enemy' + i;
      enemy[i].setAttribute('src', 'img/zombie_easy.png');
      enemy[i].setAttribute('alt', '#');
      enemysArray.push((new Enemy(enemy[i].id, Math.random() * innerWidth - 150, Math.random() * innerHeight - 150,
        shooter.getRandomArbitrary(-1, 1), shooter.getRandomArbitrary(-1, 1))));
      $('.game_wrapper').append(enemy[i]);
    }

    window.addEventListener('keydown', checkButton);
    // window.addEventListener('keyup', player.stop);
    // window.addEventListener('onclick', player.shoot);
  }

  window.shooter = window.shooter || {};
  window.shooter.init = init;
})(window);

(function (window) {
  /**
   * @description проверяет выходит ли сущность за пределы игровой зоны
   * @param {object} entity - объект класса игрока
   */
  function checkPlayerLimits(entity) {
    if (entity.posY < 0) {
      entity.posY = 0;
    }
    if (entity.posY > innerHeight - 60) {
      entity.posY = innerHeight - 60;
    }
    if (entity.posX < 0) {
      entity.posX = 0;
    }
    if (entity.posX > innerWidth - 50) {
      entity.posX = innerWidth - 50;
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkPlayerLimits = checkPlayerLimits;
})(window);

(function (window) {
  /**
   * @description проверяет выходит ли сущность за пределы игровой зоны
   * @param {object} entity - объект класса враг
   */
  function checkEnemiesLimit(entity) {
    if (entity.posY < 0) {
      entity.posY = 0;
      entity.speedY = shooter.getRandomArbitrary(-1, 1);
      entity.speedX = shooter.getRandomArbitrary(-1, 1);
    }
    if (entity.posY > innerHeight - 60) {
      entity.posY = innerHeight - 60;
      entity.speedY = shooter.getRandomArbitrary(-1, 1);
      entity.speedX = shooter.getRandomArbitrary(-1, 1);
    }
    if (entity.posX < 0) {
      entity.posX = 0;
      entity.speedY = shooter.getRandomArbitrary(-1, 1);
      entity.speedX = shooter.getRandomArbitrary(-1, 1);
    }
    if (entity.posX > innerWidth - 60) {
      entity.posX = innerWidth - 60;
      entity.speedY = shooter.getRandomArbitrary(-1, 1);
      entity.speedX = shooter.getRandomArbitrary(-1, 1);
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkEnemiesLimit = checkEnemiesLimit;
})(window);

(function (window) {
  /**
   * @description проверяет выходит ли сущность за пределы игровой зоны
   * @param {object} entity - объект класса пуля
   */
  function checkBulletLimits(array, entity, classname) {
    if (entity.posY < 15) {
      $(classname).remove();
      return array.splice(entity, 1);
    }
    if (entity.posY > window.innerHeight - 15) {
      $(classname).remove();
      return array.splice(entity, 1);
    }
    if (entity.posX < 15) {
      $(classname).remove();
      return array.splice(entity, 1);
    }
    if (entity.posX > innerWidth - 15) {
      $(classname).remove();
      return array.splice(entity, 1);
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkBulletLimits = checkBulletLimits;
})(window);

(function (window) {
  /**
   * @description проверяет столкновения сущоностей между собой
   * @param {number} enemyPosX - позиция сущности 1 по оси X
   * @param {number} enemyPosY - позиция сущности 1 по оси Y
   * @param {number} enemyWidth - ширина сущности 1
   * @param {number} enemyHeight - высота сущности 1
   * @param {number} playerPosX - позиция сущности 2 по оси X
   * @param {number} playerPosY - позиция сущности 2 по оси Y
   * @param {number} playerWidth - ширина сущности 2
   * @param {number} playerHeight - высота сущности 2
   * @return {boolean} - произошло ли столкновение
   */
  function entityContact(enemyPosX, enemyPosY, enemyWidth, enemyHeight, playerPosX, playerPosY, playerWidth, playerHeight) {
    return !(enemyWidth <= playerPosX || enemyPosX > playerWidth ||
      enemyHeight <= playerPosY || enemyPosY > playerHeight);
  }

  window.shooter = window.shooter || {};
  window.shooter.entityContact = entityContact;
})(window);

(function (window) {
  /**
   * @description проверяет на столкновения и удаляет сущностей
   * @param {array} entityEnemyArr - массив объектов
   * @param {array} entityBulletsArr - массив объектов
   * @param {array} spriteArr - массив объектов
   * @param {object} playerObj - объектс сущности игрока
   */
  function checkContact(entityEnemyArr, entityBulletsArr, spriteArr, playerObj) {
    for (let i = 0; i < entityEnemyArr.length; i++) {
      for (let j = 0; j < entityBulletsArr.length; j++) {
        if (shooter.entityContact(Math.round(entityEnemyArr[i].posX), Math.round(entityEnemyArr[i].posY), 12, 12, entityBulletsArr[j].posX, entityBulletsArr[j].posY, 12, 12)) {
          entityEnemyArr.splice(i, 1);
          spriteArr.splice(i, 1);
          $('.enemy' + i).fadeOut().remove();
          i--;
          playerObj.score += 100;
          entityBulletsArr.splice(j, 1);
          $('.bullet').remove();
          break;
        }
        if (entityEnemyArr.length === 0) {
          $('#enemy').fadeOut().remove();
        }
      }
    }
  }

  window.shooter = window.shooter || {};
  window.shooter.checkContact = checkContact;
})(window);

(function (window) {
  /**
   * получаем рандмное число в нужном интерваое
   * @param {number} min - начало интервала
   * @param {number} max - конец интервала
   * @return {number} - рандомное число
   */
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  window.shooter = window.shooter || {};
  window.shooter.getRandomArbitrary = getRandomArbitrary;
})(window);
