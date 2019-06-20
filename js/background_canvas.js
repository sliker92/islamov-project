var canvas = document.getElementById('background_canvas');
var context = canvas.getContext('2d');
var squareArray = []; // массив в который добавляются квадраты, для последующей их отрисовки
var colors = ['rgba(251, 214, 205, 0.3)', 'rgba(255, 50, 0, 0.3)',
  'rgba(55, 55, 55, 0.3)', 'rgba(167, 167, 167, 0.3)' ];  // массив цветов для квадратов
var sizes = [10, 20, 5]; // массив размеров для квадратов
canvas.style.display = 'block';
canvas.style.position = 'absolute';
canvas.style.backgroundColor = '#291414';
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

// Функция конструктор для квадратов
function Square(x, y, w, h, transformX, transformY, color, diagonal) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.transformX = transformX;
  this.transformY = transformY;
  this.color = color;
  this.diagonal = diagonal;
}

//  Методы объекта

//  отрисовывает квадраты на основе данных переданных при создании объекта с помощью ф-ии кон-ра
Square.prototype.draw = function () {
  context.fillRect(this.x, this.y, this.w, this.h);
  context.fillStyle = this.color;
};

// обновляет отрисовку на основе координат
Square.prototype.update = function () {
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

// функция принимает необходимое количество квадратов и создаёт их при помощи ф-ии кон-ра
function init(squares) {
  for (var i = 0; i < squares; i++) {
    var diagonal = 30;
    var w = randomSize(sizes);
    var h = w;
    var x = Math.random() * (innerWidth - diagonal * 2) + diagonal;
    var y = Math.random() * (innerHeight - diagonal * 2) + diagonal;
    var transformX =  (Math.random() - 0.5);
    var transformY =  (Math.random() - 0.5);
    var color = randomColor(colors);
    squareArray.push((new Square(x, y, w, h, transformX, transformY, color, w)));
  }
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, innerWidth, innerHeight); // очищает заданную область
  for (var i = 0; i < squareArray.length; i++) {
    squareArray[i].update();
  }
}

// Функции для подбора случайных значений данных
function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function randomSize() {
  return sizes[Math.floor(Math.random() * sizes.length)];
}

animate();
init(2000);
