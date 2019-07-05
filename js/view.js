var gamer = document.querySelector('.player');

function render() {
  gamer.style.transform = 'translateX(' + player.posX + 'px) translateY(' + player.posY + 'px) translateZ(0)';
  checkPlayerLimits();
  // обновляем положение врагов
  // for (let i = 0; i < enemysArray.length; i++) {
  //   enemysArray[i].enemy.style = ('translateX(' + enemysArray[i].posX + 'px) translateY(' + enemysArray[i].posY + 'px) translateZ(0)');
  //   enemysArray[i].checkLimit();
  //   enemysArray[i].enemyMove();
  // }
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
