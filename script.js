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
  speed: 1.8, 
  limitX: 800, // pixel x location to stop the vehicle 
  brakeX: 600, // pixel x location to start braking
};

const pedestrian = {
  w: 30,
  h: 30,
  x: 800,
  y: 300, 
  speed: 0.21,
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

// pedestrian ends in path of car
function scenarioOne() {
  drawPedestrian();
  drawCar();
  pedestrian.limitY = 210; 
}

// pedestrian ends 2 meters before path of car
function scenarioTwo() {
  drawPedestrian();
  drawCar();
  pedestrian.limitY = 250; 
}

// pedestrian ends 3 meters before path of car
function scenarioThree() {
  drawPedestrian();
  drawCar();
  pedestrian.limitY = 270; 
  // don't brake
  car.limitX = 2000;
  car.brakeX = 2000; 
}

// pedestrian ends 5 meters before path of car
function scenarioFour() {
  drawPedestrian();
  drawCar();
  pedestrian.limitY = 290; 
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

    // stop the pedestrian 
    if (pedestrian.y < pedestrian.limitY) {
      pedestrian.speed = 0;
    }

     // stop the car 
     if (car.x > car.limitX) {
      car.speed = 0;
    }

    // start breaking the car
    if (car.x > car.brakeX && car.speed > 0) {
      car.speed -= 0.02;
      var BBWStatus = document.getElementById('Brake-by-Wire');
      BBWStatus.textContent = 'Active';
      BBWStatus.style.color = 'green';
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


