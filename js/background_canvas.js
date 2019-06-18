var canvas = document.getElementById('background_canvas');
var context = canvas.getContext('2d');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

function Square(x, y, w, h, transformX, transformY) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.transformX = transformX;
  this.transformY = transformY;
}

Square.prototype.draw = function () {
  context.strokeRect(this.x, this.y, this.w, this.h);
  context.fillRect(this.x, this.y, this.w, this.h);
};

Square.prototype.update = function () {
  if (this.x + this.diagonal < innerWidth || this.x - this.diagonal < 0) {
    this.transformX = -this.transformX;
  }
  if (this.y + this.diagonal > innerHeight || this.y - this.diagonal < 0) {
    this.transformY = -this.transformY;
  }

  this.x += this.transformX;
  this.y += this.transformY;

  this.draw();
};

var squareArray = [];

for (var i = 0; i < 1000; i++) {
  var diagonal = 30;
  var w = 20;
  var h = 20;
  var x = Math.random() * (innerWidth - diagonal * 2) + diagonal;
  var y = Math.random() * (innerHeight - diagonal * 2) + diagonal;
  var transformX =  (Math.random() - 0.5);
  var transformY =  (Math.random() - 0.5);
  squareArray.push((new Square(x, y, w, h, transformX, transformY)));
}

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0 , innerWidth, innerHeight);

  for (var i = 0; i < squareArray.length; i++) {
    squareArray[i].update();
  }
}

animate();
var square = new Square();
square.draw();
