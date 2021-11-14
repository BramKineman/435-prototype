const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



// Car Animation 

const image = document.getElementById('car-source');

const car = {
  w: 70,
  h: 50,
  x: 20,
  y: 400,
  speed: 2,
};

function drawRoad() {
  ctx.fillstyle = 'black';
  ctx.fillRect(0, canvas.height/2, canvas.width, 200);
}

function drawCar() {
  ctx.drawImage(image, car.x, car.y, car.w, car.h);
}

function update() {
  ctx.clearRect(0,0,canvas.width, canvas.height);

  drawRoad();
  drawCar();

  // change car position
  car.x += car.speed;
  
  requestAnimationFrame(update);
}

update();
