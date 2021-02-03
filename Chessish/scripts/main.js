let OUTSIDE, ORIGIN, OUTGIN, SIDE, SDIM, WIDTH, BORDER;
let RAIN = [];
let BACKGROUND = 51;
const CHESS = new Chess();
let SELECTED = null;
let HOVERED = null;
const PIECES = [];
const ASSETS = {};
let PTURN = true;
let SUPP = 15;
let ROUND = 0;
let DEPTH = 3;
let FONT;
let DIALOGUE = null;
let yScroll = 0;
let currBox = null;
let mouseP = false;
let started = false;

function preload() {
  xhr.open('GET', "text/dialogue.txt", true);
  xhr.send();
  const colors = ['black', 'white'];
  const pieces = 'bknpqr';
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 6; j++) {
      ASSETS[colors[i] + pieces[j]] = loadImage('assets/' + colors[i] + '_' + pieces[j] + '.png');
    }
  }
  BACK = loadImage('/assets/board.png');
  RADIOON = loadImage('/assets/radio_on.png');
  RADIOOFF = loadImage('/assets/radio_off.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
  noSmooth();
  noStroke();
  textAlign(LEFT, TOP);
  //textFont('VT323');
  textFont('Poppins');
  (height < width ? SDIM = height / 10 : SDIM = width / 10);
  camera.position.x = SDIM * 4 - SDIM / 2;
  camera.position.y = SDIM * 4 - SDIM / 2;
  ORIGIN = -SDIM / 2;
  SIDE = ORIGIN + SDIM * 8;
  OUTGIN = ORIGIN - SDIM / 8;
  OUTSIDE = SIDE + SDIM / 8;
  WIDTH = SDIM * 8;
  BORDER = SDIM / 8;
  createPieces();
  setupDialogue();
  setupStart();
  scale(0.5);
}

function draw() {
  if (started) {
    if (CHESS.game_over()) {
      drawEnd();
    } else {
      console.log(CHESS.turn() == 'w' ? CHESS.moves() : '')
      background(BACKGROUND);
      drawSupplies();
      handleRain();
      drawStats();
      fill(100);
      rect(OUTGIN, OUTGIN, WIDTH + BORDER * 2, WIDTH + BORDER * 2);
      image(BACK, ORIGIN, ORIGIN, WIDTH, WIDTH);
      drawSprites();
      drawDialogue();
      checkHover();
    }
  } else {
    drawStart();
  }
}

function drawEnd() {
  background(51);
  fill(255);
  textSize(72);
  if (CHESS.in_stalemate()) {
    text("It was a draw...", 0, 100);
  } else {
    console.log("Test")
    text((CHESS.turn() == 'w') ? "You lost..." : "You won...", 0, 100);
  }
}

function mouseWheel(event) {
  let amountWhite = 0;
  for (let i in PIECES) {
    if (PIECES[i].ident.color == "w") amountWhite++;
  }

  let limit = amountWhite > 8 ? (amountWhite - 8) * SDIM - 15 : 0;
  if (camera.mouseX > OUTGIN - 4 * SDIM - (SDIM / 6) && camera.mouseX < OUTGIN - 4 * SDIM - (SDIM / 6) + 4 * SDIM && camera.mouseY > OUTGIN) {
    if (yScroll >= 0 && yScroll <= limit) {
      yScroll += event.delta;
    }
  }
  if (yScroll < 0) yScroll = 0;
  if (yScroll > limit) yScroll = limit;
}

function mousePressed() {
  mouseP = true;
  if (DIALOGUE == null) {
    if (SELECTED != null) {
      if (mouseOnBoard()) {
        mouseP = false;
        const currXSquare = Math.ceil(Math.ceil(camera.mouseX - SDIM / 2) / SDIM);
        const currYSquare = 6 - Math.floor(Math.ceil(camera.mouseY - SDIM / 2) / SDIM);
        const origin = convertMove(SELECTED.row, SELECTED.col);
        const prime = convertMove(currYSquare, currXSquare);
        if (movePiece(origin, prime, true, SELECTED.ident.type == 'k' && origin == 'e1' && prime == 'g1', SELECTED.ident.type == 'k' && origin == 'e1' && prime == 'c1', SELECTED.ident.type == 'p' && origin[1] == 7)) {
          SELECTED.position.x = Math.ceil((camera.mouseX - SDIM / 2) / SDIM) * SDIM;
          SELECTED.position.y = Math.ceil((camera.mouseY - SDIM / 2) / SDIM) * SDIM;
          SELECTED.row = currYSquare;
          SELECTED.col = currXSquare;
          calcBestMove(CHESS, DEPTH);
          checkLowStats();
          ROUND++;
          SUPP += Math.max(15 - ROUND, 0);
          if (Math.random() < 0.6) startDialogue();
        }
      }
      SELECTED.scale = SDIM / 20;
      SELECTED = null;
    }

    for (let i in PIECES) {
      if (PIECES[i].overlapPoint(camera.mouseX, camera.mouseY) && PIECES[i].ident.color == 'w') {
        SELECTED = PIECES[i];
        SELECTED.scale = SDIM / 15;
        mouseP = false;
        break;
      }
    }
  }
}

function mouseReleased() {
  mouseP = false;
}