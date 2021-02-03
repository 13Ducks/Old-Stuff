var counters = {
  students: 0,
  believers: 0,
  teachers: 0,
  schools: 0,
  disticts: 0
};

const baseCost = {
  believers: 15,
  teachers: 100,
  schools: 1100,
  disticts: 12000
};

const cpsPer = {
  believers: 0.2,
  teachers: 2,
  schools: 16,
  disticts: 96
};

var name;
name = prompt("What's your name? (Max: 14 characters)")
while (name.length > 14) {
  name = prompt("You entered a name over 14 characters! Try again...")
}

if (name === "" || name == "null") {
  name = "Curlymango"
}
function setupButtons() {
  mainClickButton = new Button(windowWidth * (1 / 20), windowHeight * (2 / 3), windowWidth * (7 / 36), windowHeight * (2 / 9))
  believersButton = new Button(windowWidth * (2.05 / 3), windowHeight * (2.85 / 10), windowWidth * (1 / 6), windowHeight * (1 / 10))
  teachersButton = new Button(windowWidth * (2.05 / 3), windowHeight * (4.85 / 10), windowWidth * (1 / 6), windowHeight * (1 / 10))
  schoolsButton = new Button(windowWidth * (2.05 / 3), windowHeight * (6.85 / 10), windowWidth * (1 / 6), windowHeight * (1 / 10))
  districtsButton = new Button(windowWidth * (2.05 / 3), windowHeight * (8.85 / 10), windowWidth * (1 / 6), windowHeight * (1 / 10))
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  img = loadImage("person.png")
  imgStick = loadImage("stick-figure.png");
  imgTeacher = loadImage("teacher.png");
  imgSchool = loadImage("school.png");
  imgDistrict = loadImage("district.png");
  print(img)

  setupButtons()
}

setInterval(calcCPS, 1000)

function draw() {
  init();
  mainButton();
  believersSet();
  teachersSet();
  schoolsSet();
  districtsSet();
  drawMid();
}

function init() {
  background(201, 48, 48);
  strokeWeight(5);
  line(windowWidth * 3 / 10, 0, windowWidth * 3 / 10, windowHeight);
  line(windowWidth * 2 / 3, 0, windowWidth * 2 / 3, windowHeight);
  strokeWeight(3);

  textSize(35);
  textAlign(LEFT, CENTER);

  for (i = 1; i <= 4; i++) {
    line(windowWidth * 3 / 10, i / 5 * windowHeight, windowWidth, i / 5 * windowHeight);


    switch (i) {
      case 1:
        text("Believers (0.2 SPS each)", (windowWidth * 2 / 3) + 10, ((i / 5) * windowHeight) + 25);
        break;
      case 2:
        text("Teachers (2 SPS each)", (windowWidth * 2 / 3) + 10, ((i / 5) * windowHeight) + 25);
        break;
      case 3:
        text("Schools (16 SPS each)", (windowWidth * 2 / 3) + 10, ((i / 5) * windowHeight) + 25);
        break;
      case 4:
        text("Districts (96 SPS each)", (windowWidth * 2 / 3) + 10, ((i / 5) * windowHeight) + 25);
        break;
    }
  }
}

function mainButton() {
  fill(51);
  rect(mainClickButton.x, mainClickButton.y, mainClickButton.w, mainClickButton.h, 20);

  textAlign(CENTER, CENTER);
  fill(255);
  textSize(60);
  text("Click!", mainClickButton.x + (mainClickButton.w / 2), mainClickButton.y + (mainClickButton.h / 2))
  text(Math.floor(counters.students), mainClickButton.x + (mainClickButton.w / 2), windowHeight * 1 / 6)
  textSize(25);
  text(name + "'s SELF program", mainClickButton.x + (mainClickButton.w / 2), windowHeight * 1 / 15)
  textSize(40)
  text("students indoctrinated", mainClickButton.x + (mainClickButton.w / 2), windowHeight * 1 / 4)
  image(img, mainClickButton.x + 20, windowHeight / 4 + 20, mainClickButton.y - windowHeight * 1 / 4 - 30, mainClickButton.y - windowHeight * 1 / 4 - 30)
  var sps = round(((cpsPer.believers * counters.believers) + (cpsPer.teachers * counters.teachers) + (cpsPer.schools * counters.schools) + (cpsPer.disticts * counters.disticts)) * 10) / 10
  text(sps + " SPS", mainClickButton.x + (mainClickButton.w / 2), windowHeight - 35)
}

function believersSet() {
  fill(51);
  strokeWeight(5);
  rect(believersButton.x, believersButton.y, believersButton.w, believersButton.h, 20);
  fill(255);
  textSize(30);
  text("Buy: " + getCost(baseCost.believers, counters.believers), believersButton.x + (believersButton.w / 2), believersButton.y + (believersButton.h / 2))
  textSize(50)
  text(counters.believers, believersButton.x + (believersButton.w * 1.5), believersButton.y + (believersButton.h / 2))
}

function teachersSet() {
  fill(51);
  strokeWeight(5);
  rect(teachersButton.x, teachersButton.y, teachersButton.w, teachersButton.h, 20);
  fill(255);
  textSize(30);
  text("Buy: " + getCost(baseCost.teachers, counters.teachers), teachersButton.x + (teachersButton.w / 2), teachersButton.y + (teachersButton.h / 2));
  textSize(50);
  text(counters.teachers, teachersButton.x + (teachersButton.w * 1.5), teachersButton.y + (teachersButton.h / 2));
}

function schoolsSet() {
  fill(51);
  strokeWeight(5);
  rect(schoolsButton.x, schoolsButton.y, schoolsButton.w, schoolsButton.h, 20);
  fill(255);
  textSize(30);
  text("Buy: " + getCost(baseCost.schools, counters.schools), schoolsButton.x + (schoolsButton.w / 2), schoolsButton.y + (schoolsButton.h / 2));
  textSize(50);
  text(counters.schools, schoolsButton.x + (schoolsButton.w * 1.5), schoolsButton.y + (schoolsButton.h / 2));
}

function districtsSet() {
  fill(51);
  strokeWeight(5);
  rect(districtsButton.x, districtsButton.y, districtsButton.w, districtsButton.h, 20);
  fill(255);
  textSize(30);
  text("Buy: " + getCost(baseCost.disticts, counters.disticts), districtsButton.x + (districtsButton.w / 2), districtsButton.y + (districtsButton.h / 2));
  textSize(50);
  text(counters.disticts, districtsButton.x + (districtsButton.w * 1.5), districtsButton.y + (districtsButton.h / 2));
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (checkMouse(mouseX, mouseY, mainClickButton.x, mainClickButton.y, mainClickButton.w, mainClickButton.h)) {
    counters.students++;
  } else if (checkMouse(mouseX, mouseY, believersButton.x, believersButton.y, believersButton.w, believersButton.h)) {
    if (counters.students >= getCost(baseCost.believers, counters.believers)) {
      counters.believers++;
      counters.students -= getCost(baseCost.believers, counters.believers - 1)
    }
  } else if (checkMouse(mouseX, mouseY, teachersButton.x, teachersButton.y, teachersButton.w, teachersButton.h)) {
    if (counters.students >= getCost(baseCost.teachers, counters.teachers)) {
      counters.teachers++;
      counters.students -= getCost(baseCost.teachers, counters.teachers - 1)
    }
  } else if (checkMouse(mouseX, mouseY, schoolsButton.x, schoolsButton.y, schoolsButton.w, schoolsButton.h)) {
    if (counters.students >= getCost(baseCost.schools, counters.schools)) {
      counters.schools++;
      counters.students -= getCost(baseCost.schools, counters.schools - 1)
    }
  } else if (checkMouse(mouseX, mouseY, districtsButton.x, districtsButton.y, districtsButton.w, districtsButton.h)) {
    if (counters.students >= getCost(baseCost.disticts, counters.disticts)) {
      counters.disticts++;
      counters.students -= getCost(baseCost.disticts, counters.disticts - 1)
    }
  }
}

function checkMouse(mouseX, mouseY, x, y, w, h) {
  return (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h)
}

function drawMid() {
  for (var i = 0; i < Math.min(9, counters.believers); i++) {
    image(imgStick, windowWidth * ((1 + i / 10) / 3), windowHeight * 1 / 5, windowWidth * 1 / 10, windowHeight * 1 / 5);
  }

  for (var i = 0; i < Math.min(9, counters.teachers); i++) {
    image(imgTeacher, windowWidth * ((1 + i / 10) / 3), windowHeight * 2 / 5, windowWidth * 1 / 10, windowHeight * 1 / 5);
  }

  for (var i = 0; i < Math.min(9, counters.schools); i++) {
    image(imgSchool, windowWidth * ((1 + i / 10) / 3), windowHeight * 3 / 5, windowWidth * 1 / 10, windowHeight * 1 / 5);
  }

  for (var i = 0; i < Math.min(9, counters.disticts); i++) {
    image(imgDistrict, windowWidth * ((1 + i / 10) / 3), windowHeight * 4 / 5, windowWidth * 1 / 10, windowHeight * 1 / 5);
  }
}

function getCost(base, n) {
  return Math.ceil((base * (Math.pow(1.15, n + 1) - 1)) / 0.15)
}

function calcCPS() {
  counters.students += cpsPer.believers * counters.believers
  counters.students += cpsPer.teachers * counters.teachers
  counters.students += cpsPer.schools * counters.schools
  counters.students += cpsPer.disticts * counters.disticts
}

function keyPressed() {
  counters.students++;
}

class Button {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
