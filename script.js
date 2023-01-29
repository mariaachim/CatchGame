let startScreenImage;
let startGame = true;
let backgroundImage;
let exitBackground;
let tuxImage;
let logos = []; // array of existing logo elements on screen
let windowsElements = []; // array of existing windows elements on screen
let types = []; // array of possible types to iterate over when making a new instance of a logo

let arch;
let fedora;
let gentoo;
let openbsd;
let redhat;
let ubuntu;
let opensuse;
let windows;
let tux;


function preload() {
  exitBackground = loadImage('assets/linux-shooting-windows.jpg');
  arch = loadImage('assets/arch.png');
  fedora = loadImage('assets/fedora.png');
  gentoo = loadImage('assets/gentoo.png');
  openbsd = loadImage('assets/openbsd.png');
  redhat = loadImage('assets/redhat.png');
  ubuntu = loadImage('assets/ubuntu.png');
  opensuse = loadImage('assets/opensuse.png');
  windows = loadImage('assets/windows.png');
  tuxImage = loadImage('assets/tux.png');
  backgroundImage = loadImage('assets/matrix.png');
  startScreenImage = loadImage('assets/startScreen.jpg');
}

function setup() {
  createCanvas(800, 600);
  //tux = new Tux(tuxImage, windowWidth * 0.5, windowHeight * 0.8);
  tux = new Tux(tuxImage, width * 0.5, height * 0.8);

  types.push(arch, fedora, gentoo, openbsd, redhat, ubuntu, opensuse);
}

function draw() {
  imageMode(CENTER);
  image(backgroundImage, width / 2, height / 2, width, height);
  fill(120);
  //rect(0, windowHeight - windowHeight * 0.1, windowWidth, windowHeight * 0.1);
  rect(0, height - height * 0.1, width, height * 0.1);
  // changed from rect(0, windowWidth * 0.9, windowWidth, windowHeight * 0.1);
  updateHud();
  updatePosition();
  detectKeys();
  detectCollision();

  if (startGame === true) {
    startScreen();
  }

  // 1% chance of a logo being spawned every frame
  if (Math.floor(Math.random() * 100) === 90) {
    dropLogo();
  }

  if (Math.floor(Math.random() * 1000 > 995)) {
    dropWindows();
  }


}

function dropLogo() {
  //logo = new Logo(5, types[Math.floor(Math.random() * types.length)]);
  logo = new Logo(30, random(types)); // uses the p5 random function which is easier to read, in this case it takes the array name as the input and returns a random item from the array
  console.log("Logo Spawned");
  logo.fall();
  logos.push(logo);
}

function dropWindows() {
  windowsLogo = new Logo(60, windows);
  console.log("Windows Spawned");
  windowsLogo.fall();
  windowsElements.push(windowsLogo);
}

function updateHud() {
  fill(255);
  textSize(20);
  text("Caught: " + tux.points, 10, 30);
  text("Missed: " + tux.itemsMissed, width - 120, 30);
}
/*
function startScreen() {
  image(? , windowWidth, windowHeight)
  
}
*/

function quitGame() {
  //image(exitBackground, windowWidth, windowHeight);
  image(exitBackground, width, height);
}

function detectKeys() {
  if (keyIsDown(65) || keyIsDown(LEFT_ARROW)) { // upper case ascii code
    tux.x = tux.x - 10;
  } else if (keyIsDown(68) || keyIsDown(RIGHT_ARROW)) {
    tux.x = tux.x + 10;
  }
}

function keyPressed() {
  if (keyCode === 32 && startGame === true) {
    startGame = false;
    print("startGame: " + startGame);
    loop();
  }
}

function detectCollision() {
  for (let i = 0; i < logos.length; i++) {
    //if (sqrt((tux.x + logos[i].x) ^ 2 + (tux.y + logos[i].y) ^ 2) < tux.radius + logos[i].radius) {
    //if (abs(tux.x - logos[i].x) < 50 && abs(tux.y - logos[i].y) < 50) {
    if (dist(tux.x, tux.y, logos[i].x, logos[i].y) < tux.radius + logos[i].radius) {
      console.log("Collision detected, X diff: " + abs(tux.x - logos[i].x) + ", Y diff: " + abs(tux.y - logos[i].y));
      tux.points += 1;
      tux.itemsCaught += 1;
      logos.splice(i, 1);
    }
  }

  // needs updating to dist() collision system, maybe this could be merged into the original loop?
  for (let i = 0; i < windowsElements.length; i++) {
    if (abs(tux.x - windowsElements[i].x) < 50 && abs(tux.y - windowsElements[i].y) < 50) {
      console.log("Collision detected, X diff: " + abs(tux.x - windowsElements[i].x) + ", Y diff: " + abs(tux.y - windowsElements[i].y));
      tux.windowsCaught += 1;
      windowsElements.splice(i, 1);
    }
  }
}


function updatePosition() {
  //redraws tux at current coordinates
  tux.makeImage();
  tux.updateY(height * 0.85);

  //if (tux.x > windowWidth - 45) {
  if (tux.x > width - 45) {
    //tux.x = windowWidth - 45;
    tux.x = width - 45;
  } else if (tux.x < 30) {
    tux.x = 30;
  }

  // iterate through logos array and make each item fall
  for (let i = 0; i < logos.length; i++) {
    logos[i].fall();
    //if (logos[i].y < windowHeight - windowHeight * 0.1) {
    if (logos[i].y < height - height * 0.1) {
      logos[i].y = logos[i].y + 1;
    } else {
      tux.itemsMissed += 1;
      logos.splice(i, 1);
    }
  }

  for (let i = 0; i < windowsElements.length; i++) {
    windowsElements[i].fall();
    //if (windowsElements[i].y < windowHeight - windowHeight * 0.1) {
    if (windowsElements[i].y < height - height * 0.1) {
      windowsElements[i].y = windowsElements[i].y + 1;
    } else {
      windowsElements.splice(i, 1);
    }
  }
}