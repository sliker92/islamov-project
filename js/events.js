window.addEventListener('keydown', checkButton);
window.addEventListener('keyup', player.playerStop);
window.addEventListener('onclick', player.shoot);
window.addEventListener('mousemove', checkButton);

function checkButton(EO) {
  EO = EO || window.event;

  // проверяем на нажатие кнопки действий игрока
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
  if (EO.keyCode === 32) {
    player.boolets -= 1;
    if (player.boolets < 1) player.boolets = 0;
    console.log(player.boolets);
  }

  if (EO.keyCode === 82) {
    setTimeout( function(){
      player.boolets = 8;
    }, 1000 );
    console.log(player.boolets);
  }


  // const playerCenter = getCenter();
  // const angle = Math.atan2(EO.clientX - playerCenter.x, -(EO.clientY - playerCenter.y)) * (180 / Math.PI);
  // playerDoc.style.transform = 'rotate(' + angle + 'deg)';
}

// function mouseFollow(EO) {
//   EO = EO || window.event;
//   // PreventDefault();
//   const playerCenter = getCenter();
//   const angle = Math.atan2(EO.clientX - playerCenter.x, -(EO.clientY - playerCenter.y)) * (180 / Math.PI);
//   playerDoc.style.transform = 'rotate(' + angle + 'deg)';
// }

// function getCenter() {
//   const playerDoc = window.querySelector('.player');
//   const x = playerDoc.offsetLeft;
//   const y = playerDoc.offsetTop;
//   return {
//     x: x,
//     y: y
//   };
// }
