let YESBTN, NOBTN;
let lastX, lastY;
let yesClicked = false;
let noClicked = false;
let stage;
let initialYes;
let buffer = 100;
let choseTime;
let currText, chose, underYes, underNo;
let qAll = {
  "p": [],
  "n": [],
  "b": [],
  "r": [],
  "q": []
};

class Dialogue {
  constructor(start, yesResponse, noResponse) {
    this.start = start;
    this.yesCustom = "Yes";
    this.yesResponse = yesResponse;
    this.yesAlt = [];
    this.noCustom = "No";
    this.noResponse = noResponse;
    this.noAlt = [];
  }
  addYesCustom(text) {
    this.yesCustom = text;
  }
  addNoCustom(text) {
    this.noCustom = text;
  }
  addYesAlt(text, change) {
    this.yesAlt.push([text, change])
  }
  addNoAlt(text, change) {
    this.noAlt.push([text, change])
  }
}

class Change {
  constructor(stat, amount, target) {
    this.isMorale = (stat == 'morale');
    this.isTrust = (stat == 'trust');
    this.isHealth = (stat == 'health');
    this.amount = amount;
    this.target = null;
  }

  addTarget(piece) {
    this.target = piece;
  }

  activate() {
    if (this.target == null) {
      this.target = DIALOGUE;
    }
    if (this.isMorale) {
      this.target.morale = Math.max(0, this.target.morale + this.amount);
      this.target.morale = Math.min(4, this.target.morale);
    } else if (this.isTrust) {
      this.target.trust = Math.max(0, this.target.trust + this.amount);
      this.target.trust = Math.min(4, this.target.trust);
    } else if (this.isHealth) {
      this.target.health = Math.max(0, this.target.health + this.amount);
      this.target.health = Math.min(4, this.target.health);
    } else {
      SUPP = Math.max(0, SUPP + this.amount);
    }
  }
}

function findPiece(ident) {
  for (let i in PIECES) {
    if (PIECES[i].ident.color == 'w' && PIECES[i].ident.type == ident && PIECES[i] != DIALOGUE) {
      return PIECES[i];
    }
  }

  return false;
}

function setupDialogue() {
  for (let i = 0; i < lines.length - 3; i++) {
    let piece = lines[i];
    let startText = lines[i + 1];
    let yesText = lines[i + 2];
    let noText = lines[i + 3];
    yesArr = yesText.split(' _ ');
    let yesChangeArr = [];
    yesChange = new Change(yesArr[2], parseInt(yesArr[3]));
    if (yesArr.length > 4 && findPiece(yesArr[4])) {
      yesChange.addTarget(findPiece(yesArr[4]));
    }
    yesChangeArr.push(yesChange);
    for (let j = 5; j < yesArr.length; j += 3) {
      let nextChange = new Change(yesArr[j], parseInt(yesArr[j + 1]));
      if (findPiece(yesArr[j + 2])) {
        nextChange.addTarget(findPiece(yesArr[j + 2]));
      }
      yesChangeArr.push(nextChange);
    }
    noArr = noText.split(' _ ');
    let noChangeArr = [];
    noChange = new Change(noArr[2], parseInt(noArr[3]));
    if (noArr.length > 4 && findPiece(noArr[4])) {
      noChange.addTarget(findPiece(noArr[4]));
    }
    noChangeArr.push(noChange);
    for (let j = 5; j < noArr.length; j += 3) {
      let nextChange = new Change(noArr[j], parseInt(noArr[j + 1]));
      if (findPiece(noArr[j + 2])) {
        nextChange.addTarget(findPiece(noArr[j + 2]));
      }
      noChangeArr.push(nextChange);
    }
    d = new Dialogue(startText, [yesArr[1], yesChangeArr], [noArr[1], noChangeArr]);
    d.addYesCustom(yesArr[0]);
    d.addNoCustom(noArr[0]);
    let counter = 4;
    let nextLine = lines[i + counter].split(" _ ");
    while (nextLine[0] == "YESALT" || nextLine[0] == "NOALT") {
      counter++;
      let altChangeArr = [];
      let newChange = new Change(nextLine[2], parseInt(nextLine[3]));
      if (nextLine.length > 4 && findPiece(nextLine[4])) {
        newChange.addTarget(findPiece(nextLine[4]));
      }
      altChangeArr.push(newChange);
      for (let j = 5; j < nextLine.length; j += 3) {
        let nextChange = new Change(nextLine[j], parseInt(nextLine[j + 1]));
        if (findPiece(nextLine[j + 2])) {
          nextChange.addTarget(findPiece(nextLine[j + 2]));
        }
        altChangeArr.push(nextChange);
      }
      if (nextLine[0] == "YESALT") {
        d.addYesAlt(nextLine[1], altChangeArr);
      } else {
        d.addNoAlt(nextLine[1], altChangeArr);
      }
      nextLine = lines[i + counter].split(" _ ");
    }
    i += counter;
    qAll[piece].push(d);
  }
}

function drawDialogue() {
  if (DIALOGUE != null) {
    if (YESBTN.overlapPoint(camera.mouseX, camera.mouseY)) {
      yesClicked = mouseIsPressed;
      YESBTN.changeImage('radon');
    } else {
      yesClicked = false;
      YESBTN.changeImage('radoff');
    }

    if (NOBTN.overlapPoint(camera.mouseX, camera.mouseY)) {
      noClicked = mouseIsPressed;
      NOBTN.changeImage('radon');
    } else {
      noClicked = false;
      NOBTN.changeImage('radoff');
    }

    background(51);
    DIALOGUE.position.x = ORIGIN + SDIM * 4;
    DIALOGUE.position.y = ORIGIN + SDIM * 2;
    DIALOGUE.scale = SDIM / 15;
    drawSprite(DIALOGUE);
    textSize(24);
    fill(255);
    textAlign(CENTER, TOP);
    text(DIALOGUE.name, ORIGIN + SDIM * 4, ORIGIN + SDIM * 0.8)
    text(currText, ORIGIN-SDIM*6, ORIGIN + SDIM * 3, SDIM*20);
    text(underYes, ORIGIN, ORIGIN + SDIM * 5.3, SDIM * 4);
    text(underNo, ORIGIN + SDIM * 4, ORIGIN + SDIM * 5.3, SDIM * 4);
    textAlign(LEFT, TOP);
    drawSprite(YESBTN);
    drawSprite(NOBTN);

    if (stage == 0 && yesClicked) {
      stage++;
      initialYes = true;
      firstYes();
    }

    if (stage == 0 && noClicked) {
      stage++;
      initialYes = false;
      firstNo();
    }

    if (stage == 1 && yesClicked && Date.now() - choseTime > buffer) {
      stage++;
      if (initialYes && chose.yesAlt.length == 0) {
        endDialogue();
      } else if (initialYes) {
        doYesAlt();
      }

      if (!initialYes && chose.noAlt.length == 0) {
        endDialogue();
      } else if (!initialYes) {
        doNoAlt();
      }
    }

    if (stage == 2 && DIALOGUE != null && yesClicked && Date.now() - choseTime > 500) {
      endDialogue();
    }
  }
}

function endDialogue() {
  console.log(DIALOGUE.morale + " " + DIALOGUE.trust + " " + DIALOGUE.health)
  YESBTN.remove();
  DIALOGUE.position.x = lastX;
  DIALOGUE.position.y = lastY;
  DIALOGUE.scale = SDIM / 20;
  DIALOGUE = null;
}

function firstYes() {
  choseTime = Date.now();
  for (let i in chose.yesResponse[1]) {
    chose.yesResponse[1][i].activate();
  }
  currText = chose.yesResponse[0];
  underYes = "";
  underNo = "";
  YESBTN.position.x = ORIGIN + SDIM * 4;
  NOBTN.remove();
}

function firstNo() {
  choseTime = Date.now();
  for (let i in chose.noResponse[1]) {
    chose.noResponse[1][i].activate();
  }
  currText = chose.noResponse[0];
  underYes = "";
  underNo = "";
  YESBTN.position.x = ORIGIN + SDIM * 4;
  NOBTN.remove();
}

function doYesAlt() {
  choseTime = Date.now();
  let choseAlt = chose.yesAlt[Math.floor(Math.random() * chose.yesAlt.length)];
  currText = choseAlt[0];
  for (let i in choseAlt[1]) {
    choseAlt[1][i].activate();
  }
}

function doNoAlt() {
  choseTime = Date.now();
  let choseAlt = chose.noAlt[Math.floor(Math.random() * chose.noAlt.length)];
  currText = choseAlt[0];
  for (let i in choseAlt[1]) {
    choseAlt[1][i].activate();
  }
}

function startDialogue() {
  let haveLeft = {
    'p' : qAll['p'].length > 0,
    'b' : qAll['b'].length > 0,
    'n' : qAll['n'].length > 0,
    'r' : qAll['r'].length > 0,
    'q' : qAll['q'].length > 0
  }
  let noneLeft = true;
  for (let b in haveLeft) {
    if (haveLeft[b]) noneLeft = false;
  }
  if (noneLeft) return;
  DIALOGUE = PIECES[Math.floor(Math.random() * PIECES.length)];
  while (DIALOGUE.ident.color == 'b' || !haveLeft[DIALOGUE.ident.type]) {
    DIALOGUE = PIECES[Math.floor(Math.random() * PIECES.length)];
  }
  console.log(DIALOGUE.morale + " " + DIALOGUE.trust + " " + DIALOGUE.health)
  YESBTN = createSprite(ORIGIN + SDIM * 2, ORIGIN + SDIM * 4.5, 40, 40);
  YESBTN.addImage('radoff',RADIOOFF);
  YESBTN.addImage('radon',RADIOON);
  YESBTN.scale = 3;
  NOBTN = createSprite(ORIGIN + SDIM * 6, ORIGIN + SDIM * 4.5, 40, 40);
  NOBTN.addImage('radoff',RADIOOFF);
  NOBTN.addImage('radon',RADIOON);
  NOBTN.scale = 3;
  lastX = DIALOGUE.position.x;
  lastY = DIALOGUE.position.y;
  arr = qAll[DIALOGUE.ident.type];
  let index = Math.floor(Math.random() * arr.length);
  chose = arr[index];
  arr.splice(index,1);
  currText = chose.start;
  underYes = chose.yesCustom;
  underNo = chose.noCustom;
  stage = 0;
  initialYes = false;
}