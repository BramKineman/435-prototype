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
  limitX: 100, // pixel x location to stop the vehicle 
};

const pedestrian = {
  w: 50,
  h: 50,
  x: 800,
  y: 300, 
  speed: 0,
  limitY: 100 // pixel height of where pedestrian stops
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

function scenarioOne() {
  drawPedestrian();
  pedestrian.speed = 0.1;
  pedestrian.limit = 100; 
  car.speed = 1;

}

function scenarioTwo() {
  car.speed = 1;
}
function scenarioThree() {
  car.speed = 1;
}
function scenarioFour() {
  car.speed = 1;
}
function scenarioFive() {
  car.speed = 1;
}
function scenarioSix() {
  car.speed = 1;
}
function scenarioSeven() {
  car.speed = 1;
}
function scenarioEight() {
  car.speed = 1;
}
function scenarioNine() {
  car.speed = 1;
}
function scenarioTen() {
  car.speed = 1;
}

function start() {
  function update() {
    // redraw for animation
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawRoad();
    drawCar();
    drawPedestrian();

    // stop the pedestrian 
    if (pedestrian.y < pedestrian.limitY) {
      pedestrian.speed = 0;
    }

     // stop the car 
     if (car.x > car.limitX) {
      car.speed = 0;
    }

    // change car position
    car.x += car.speed;
    pedestrian.y -= pedestrian.speed;

    
    requestAnimationFrame(update);
  }

  update();

}

function restart() {
  window.location.reload();
}


