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
  y: 300, 
  speed: 0,
  limit: 100 // pixel height of where pedestrian stops
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

function displaySlowPedestrian() {
  drawPedestrian();
  pedestrian.speed = 0.05;
}

function displayFastPedestrian() {
  drawPedestrian();
  pedestrian.speed = 0.2;
}

function scenarioOne() {
  drawPedestrian();
  pedestrian.speed = 0.05;
  pedestrian.limit = 100; 
  car.speed = 1;

}

function scenarioTwo() {

}
function scenarioThree() {

}
function scenarioFour() {

}
function scenarioFive() {

}
function scenarioSix() {

}
function scenarioSeven() {

}
function scenarioEight() {

}
function scenarioNine() {

}
function scenarioTen() {

}

function start() {
  function update() {
    // redraw for animation
    ctx.clearRect(0,0,canvas.width, canvas.height);

    drawRoad();
    drawCar();
    drawPedestrian();

    // stop the pedestrian TODO Issue with this, pedestrian just isn't moving?
    if (pedestrian.y < pedestrian.limit) {
      pedestrian.speed = 0;
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


