const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



// Car Animation 

const carImage = document.getElementById('car-source');
const staticPedestrianImage = document.getElementById('pedestrian-source');



drawRoad();

const car = {
  w: 70,
  h: 50,
  x: 20,
  y: 200,
  speed: 1,
};

const pedestrian = {
  w: 50,
  h: 50,
  x: 800,
  y: 300
};

function drawRoad() {
  ctx.fillstyle = 'black';
  ctx.fillRect(0, canvas.height/2 -100, canvas.width, 200);

}

function drawCar() {
  ctx.drawImage(carImage, car.x, car.y, car.w, car.h);
}

function drawPedestrian() {
  ctx.drawImage(staticPedestrianImage, pedestrian.x, pedestrian.y, pedestrian.w, pedestrian.h);
}


function displayFastCar() {
  drawCar();
  car.speed = 2;
}

function displaySlowCar() {
  drawCar();
  car.speed = 1;
} 
function displayStaticPedestrian() {
  drawPedestrian();
}

function start() {
  function update() {
    // redraw for animation
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawRoad();
    drawCar();
    drawPedestrian();

    // change car position
    car.x += car.speed;
    
    requestAnimationFrame(update);
  }

  update();

}


