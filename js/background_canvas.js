const audio = document.querySelector('audio');
const canvas = document.getElementById('background_canvas');
const context = canvas.getContext('2d');
const colors = ['rgba(251, 214, 205, 0.3)', 'rgba(255, 50, 0, 0.3)',
  'rgba(55, 55, 55, 0.3)', 'rgba(167, 167, 167, 0.3)'];  // массив цветов для квадратов
const sizes = [10, 20, 5]; // массив размеров для квадратов
let squareArray = []; // массив в который добавляются квадраты, для последующей их отрисовки

class Square {
  constructor(x, y, w, h, transformX, transformY, color, diagonal) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.transformX = transformX;
    this.transformY = transformY;
    this.color = color;
    this.diagonal = diagonal;
  }

  draw = () => {
    context.fillRect(this.x, this.y, this.w, this.h);
    context.fillStyle = this.color;
  };

  // обновляет отрисовку на основе координат
  update = () => {
    // условия столкновения с осью X по краям экрана
    if (this.x + this.diagonal > innerWidth || this.x < 0) {
      this.transformX = -this.transformX;
    }
    // условия столкновения с осью Y по краям экрана
    if (this.y + this.diagonal > innerHeight || this.y < 0) {
      this.transformY = -this.transformY;
    }

    this.x += this.transformX;
    this.y += this.transformY;
    this.draw();
  };
}

/**
 * @param {number} squares - число квадратов для отрисовки
 * функция принимает необходимое количество квадратов и создаёт их при помощи ф-ии кон-ра
 */
function init(squares) {
  canvasStyle();

  for (let i = 0; i < squares; i++) {
    const diagonal = 30;
    let w = randomSize(sizes);
    let h = w;
    let x = Math.random() * (innerWidth - diagonal * 2) + diagonal;
    let y = Math.random() * (innerHeight - diagonal * 2) + diagonal;
    let transformX = (Math.random() - 0.5);
    let transformY = (Math.random() - 0.5);
    let color = randomColor(colors);
    squareArray.push((new Square(x, y, w, h, transformX, transformY, color, w)));
  }
}

/**
 * обновляет и отрисовывает положение квардартов на каждом requestAnimationFrame
 */
let animate = () => {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight); // очищает заданную область
  for (let i = 0; i < squareArray.length; i++) {
    squareArray[i].update();
  }
};

// устанавливает стили для тэга canvas
let canvasStyle = () => {
  canvas.style.display = 'block';
  canvas.style.position = 'absolute';
  canvas.style.backgroundColor = '#291414';
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
};

// Функции для подбора случайных значений данных
let randomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

let randomSize = () => {
  return sizes[Math.floor(Math.random() * sizes.length)];
};

// запускает локальный аудиофайл
$(() => {
  $(document).ready(() => {
    audio.play();
  });
});
animate();
init(2000);
