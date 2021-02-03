let startBtn, tutorialBtn, creditsBtn;
let inMain = true;
let inTutorial = false;
let inCredits = false;
let bufferStart = 500;
let now = Date.now();

function setupStart() {
  startBtn = createSprite(ORIGIN + SDIM * 4, ORIGIN + SDIM * 3, SDIM * 8, SDIM * 1.5);
  tutorialBtn = createSprite(ORIGIN + SDIM * 4, ORIGIN + SDIM * 5, SDIM * 8, SDIM * 1.5);
  creditsBtn = createSprite(ORIGIN + SDIM * 4, ORIGIN + SDIM * 7, SDIM * 8, SDIM * 1.5);
}

function drawStart() {
  textFont('VT323');
  if (inMain) {
    drawMain();
    if (mouseIsPressed && Date.now() - now > bufferStart) {
      now = Date.now();
      if (startBtn.overlapPoint(camera.mouseX, camera.mouseY)) {
        started = true;
        endStart();
      } else if (tutorialBtn.overlapPoint(camera.mouseX, camera.mouseY)) {
        inMain = false;
        inTutorial = true;
      } else if (creditsBtn.overlapPoint(camera.mouseX, camera.mouseY)) {
        inMain = false;
        inCredits = true;
      }
    }
  }

  if (inTutorial) {
    drawTutorial();
  }

  if (inCredits) {
    drawCredits();
  }
}

function drawMain() {
  background(57); //change to background image of chessish name + images 
  drawSprite(startBtn);
  drawSprite(tutorialBtn);
  drawSprite(creditsBtn);
  backImage = ASSETS['blackp'];
  backImage2 = ASSETS['whitek'];
  push();
  rotate(radians(-20));
  image(backImage,ORIGIN-SDIM*7,ORIGIN-SDIM, SDIM*4, SDIM*5);
  pop();
  push();
  rotate(radians(20));
  image(backImage2,SIDE+SDIM*2.5,ORIGIN - SDIM*2, SDIM*4.5, SDIM*5);
  pop();
  textAlign(CENTER, CENTER);
  textSize(120);
  fill(255);
  text("CHESSISH", ORIGIN+SDIM*4, ORIGIN+SDIM/2);
  textSize(60);
  fill(0);
  text("start", startBtn.position.x, startBtn.position.y);
  text("tutorial", tutorialBtn.position.x, tutorialBtn.position.y);
  text("credits", creditsBtn.position.x, creditsBtn.position.y);
}

function drawCredits() {
  background(255, 0, 0);
  textSize(72);
  textAlign(CENTER, CENTER);
  //text("CREDITS GO HERE MAKE SURE TO CITE ALL IMAGES AND SPRITES", ORIGIN - SDIM * 6, ORIGIN + SDIM * 4, width * 0.8)
  if (mouseIsPressed && Date.now() - now > bufferStart) {
    now = Date.now();
    inCredits = false;
    inMain = true;
  }
}

function drawTutorial() {
  background(0, 0, 255);
  textSize(72);
  textAlign(CENTER, CENTER);
  //text("TUTORIAL GOES HERE MAKE SURE TO INCLUDE ALL MECHANICS SO NO CONFUSION", ORIGIN - SDIM * 6, ORIGIN + SDIM * 4, width * 0.8)
  if (mouseIsPressed && Date.now() - now > bufferStart) {
    now = Date.now();
    inTutorial = false;
    inMain = true;
  }
}

function endStart() {
  startBtn.remove();
  tutorialBtn.remove();
  creditsBtn.remove();
}