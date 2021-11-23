const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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
  braking: false,
};

pedestrian = {
  w: 30,
  h: 30,
  x: 800,
  y: 300, 
  speed: 0.21,
  limitY: 100, // pixel height of where pedestrian stops
  delay: 0 // delay before pedestrian starts. I am calculating this based on the location of the car. ie. Car takes 3 seconds to travel 780 pixels, so if delay is 1.5 seconds, set delay to 390 pixels --> if(car.x > delay) { pedestrian moves}
};

function drawRoad() {
  // road
  ctx.fillStyle = "#424949";
  ctx.fillRect(0, canvas.height/2 -120, canvas.width, 200);
  //lines
  ctx.fillStyle = "#e6ec22"
  ctx.fillRect(20, 180, 80, 8)
  ctx.fillRect(200, 180, 80, 8)
  ctx.fillRect(380, 180, 80, 8)
  ctx.fillRect(560, 180, 80, 8)
  ctx.fillRect(740, 180, 80, 8)
  ctx.fillRect(920, 180, 80, 8)
  ctx.fillRect(1100, 180, 80, 8)
  //sidewalk 
  ctx.fillStyle = "#717d7e";
  ctx.fillRect(0, canvas.height/2 + 80, canvas.width, 120);
  ctx.fillRect(0, 0, canvas.width, 90);
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
    // don't brake
    car.limitX = 2000;
    car.brakeX = 2000; 
}

// Pedestrian is static for 1.5sec then moving
function scenarioFive() {
  pedestrian.y = 200;
  drawPedestrian();
  drawCar();
  pedestrian.delay = 390;
}

// Pedestrian starts at 2 meters away and is static for 1.8sec then moving
function scenarioSix() {
  pedestrian.y = 250;
  drawPedestrian();
  drawCar();
  pedestrian.delay = 468;
}

// Pedestrian is static for 1.1sec then moving
function scenarioSeven() {
  pedestrian.y = 290;
  drawPedestrian();
  drawCar();
  pedestrian.delay = 286;
}

// Pedetsiran is in the path of the car and static
function scenarioEight() {
  pedestrian.speed = 0;
  pedestrian.y = 210;
  drawPedestrian();
  drawCar();
}

// Pedestrian is 2 meters before the path of the car and static
function scenarioNine() {
  pedestrian.speed = 0;
  pedestrian.y = 250;
  drawPedestrian();
  drawCar();
}

// Pedestrian is 4 meters before the path of the car and static
function scenarioTen() {
  pedestrian.speed = 0;
  pedestrian.y = 290;
  drawPedestrian();
  drawCar();
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

    if (pedestrian.x - 500 < car.x && car.braking == false && pedestrian.y > 200) {
      var status = document.getElementById('Alerts');
      status.textContent = 'Pedestrian Detected'; 
      status.style.color = 'Teal';
    }

    // start braking
    if (car.x > car.brakeX && car.speed > 0) {
      // Brake car
      if (car.speed > 0) {
        car.speed -= 0.02;
      }
      car.braking = true;


      // BBW Active, Cruise Paused
      var BBWStatus = document.getElementById('Brake-by-Wire');
      BBWStatus.textContent = 'Active';
      BBWStatus.style.color = 'green';
      var CruiseStatus = document.getElementById('Cruise-Control');
      CruiseStatus.textContent = 'Paused';
      CruiseStatus.style.color = 'yellow';


      // HUD Active
      var HUDStatus = document.getElementById('HUD');
      HUDStatus.textContent = 'Active';
      HUDStatus.style.color = 'green';

      // Alert Log
      var AlertStatus = document.getElementById('Alerts');
      var status = document.getElementById('Alerts');
      status.textContent = 'Pedestrian Detected, Driver Alerted, Brakes Applied'; 
      status.style.color = 'Teal';
    } else if (pedestrian.y < 195) {
      car.limitX = 2000;
      car.brakeX = 2000; 
      if (car.speed < 1.8) {
        car.speed += 0.02;
      }
      car.braking = false;

      var AlertStatus = document.getElementById('Alerts');
      var status = document.getElementById('Alerts');
      status.textContent = 'Pedestrian Cleared, Returning to Steady Speed'; 
      status.style.color = 'Teal';

      // BBW Inactive, Cruise Active
      var BBWStatus = document.getElementById('Brake-by-Wire');
      BBWStatus.textContent = 'Inactive';
      BBWStatus.style.color = 'red';
      var CruiseStatus = document.getElementById('Cruise-Control');
      CruiseStatus.textContent = 'Active';
      CruiseStatus.style.color = 'green';

      // HUD Active
      var HUDStatus = document.getElementById('HUD');
      HUDStatus.textContent = 'Inactive';
      HUDStatus.style.color = 'red';
    }

    // change car position
    car.x += car.speed;
    
    if (car.x > pedestrian.delay) {
      pedestrian.y -= pedestrian.speed;
    }
  
    requestAnimationFrame(update);
  }

  update();

}

function restart() {
  window.location.reload();
}


