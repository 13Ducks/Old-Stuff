const letters = 'abcdefgh';
const nameListBoy = "AugustusBroderickHassanEanBrunoGreysonYaelVaughnBraxtonQuincyMaximDaleSkylarHectorKaneJaggerClintonEddieAlvaroBentleyKamrenMitchellRexAlbertGiovaniKolbyCaidenJeremiahWalkerWyattMakaiDonaldLyricSladeTalonGerardoCaseBrandenMilesCollinKeltonLawsonJaidenAustinAyaanOscarShaneManuelKeeganZacheryHoustonDavidMalakiAceFrankieJoshNasirErnestBradenPedroLewisJaylinDeonTalanBryantBlaineRolandWilliamAndreNathanaelGlennPhilipKamdenCristianJamarionGaelRamiroJohanAnthonyKyleMaximusCraigFelipeJustinArnSavJohnHumbertoJoaquinTheodoreMosesJakobMalakaiArjunAidynKenyonBradleyTerrenceMicahJayLeandroGordonPatrickRiverPhillipJacobyDaneJayvionGregoryLeonelJamariAdenDariusMauriceYahirWaylonBarrettChaseMathiasErickJulioTrentonAlexRafaelMarquesColeFranciscoRonaldCaelKingstonFinneganBraedonJavionElvisIvanGabrielDarioHarperEdwardStanleyMaddenKarsonCalebAbdielStephenJamisonAydinDillanKadenFisherIsaiTyreseFrancoNoahNoelCoreyEzekielBlazeLondonLawrenceDamariJeremyPeterPorterCarmeloQuintinMessiahReneJacksonLeviKodyAlecCarsonTannerMaximillianJairoAlonsoGiovanniSantosDamarionLeonidasKashCooperPranavMatiasBrodieJonathanYairAdonisSaulDereonJusticeEduardoIsaiahDwayneAdrielXavierKianCarsenJoshuaTomerAaryanGuyMartin".split(/(?=[A-Z])/);
const nameListGirl = "NinaRoryKayaJayleenJaceyAutumnMayaMiriamKarleeSavannaMollieLinaFrancesHalleLillianKierstenIzabelleNadiaSarahJulissaSimoneJordanJuliaEmiliaFridaRosaLiviaMarisaVictoriaAriaSandraMckennaLaineyElaineTessMagdalenaScarlettAnabelleCatalinaLaciKristenMinaHadleyLorenaAlannahAngeliqueLauraKaiaAubreyIsabellaMirandaIsabelaAbbyLilahBiancaElianaAlisaSabrinaCalliePaulinaAimeeCrystalJanetVivianaMacyAvahAudreySummerMaceyAngelinaKaleighDaniellaSaraiThaliaLillyKatelynJasmineJulietCamilaAnastasiaMaliyahAmelieAmaraJaneAmirahDaniaKarsynMelanieJillianAngelaJamieKaitlynKylaLaraDakotaAinsleyTianaCiaraKileyFaithAllieCierraKarlaLoreleiCassandraNataliaPhoebeRyleePresleyTaliyahAllisonCarlieMicahGwendolynMaritzaLizethJaydaSanaaFionaJennyDiyaReaganAbigayleRachelKatelynnAdrianaAaliyahAshleyCamrynDaisyEdithHaydenIngridLucilleJustineAubrieKaylinCharityKierraFelicityCarolineMakailaLaylahLiaSageAmiahHeavenNoelleAdelynJazminChanaShaniyaKaylynEllianaJulieDianaBrileyCeciliaAriellaGiselleParkerAyannaGuadalupeDamarisBelenSidneyLeilaLeiaNyasiaLizbethMicaelaYazminElsieLolaYasmineCeceliaCaliAmaniKelseyItzelKarenJazmineNoraRoseCarlaTabithaAudrinaJaylahAnsleyEllieSariahKendraNiaIlianaMichelleHallieAileenYaretziAlissaAmiya".split(/(?=[A-Z])/);
let lines = [];

function createRain() {
  for (let i = 0; i < 3; i++) {
    const x = Math.round(Math.random() * (width * 3)) - width;
    const speed = Math.random() * 0.1 + 0.1;
    const wid = Math.random() * 2 + 3;
    const hei = Math.random() * 20 + 10;
    const ren = new Rain(x, wid, hei, speed);
    RAIN.push(ren);
  }
}

function handleRain() {
  createRain();
  for (let i in RAIN) {
    if (RAIN[i].y > SIDE + SDIM) {
      RAIN.splice(i, 1);
    }
    RAIN[i].update();
    RAIN[i].draw();
  }
}

function drawStats() {
  fill(100);
  textAlign(TOP, LEFT)
  textSize(22);
  rect(OUTSIDE + (SDIM / 6), OUTGIN, textWidth("Miserable") + SDIM / 4, SDIM * 3.5);
  let currPiece = SELECTED != null ? SELECTED : HOVERED;
  if (currPiece != null) {
    textSize(22);
    let w1 = textWidth("Miserable");
    textSize(28);
    let w2 = textWidth(currPiece.name);
    let width = Math.max(w1, w2)
    rect(OUTSIDE + (SDIM / 6), OUTGIN, width + SDIM / 4, SDIM * 3.5);
    fill(255);
    text(currPiece.name, OUTSIDE + (SDIM / 4), OUTGIN + (SDIM / 4));
    textSize(22);
    const morale = getStat(currPiece.morale);
    fill(255);
    text('Morale: ', OUTSIDE + (SDIM / 4), SDIM / 3);
    fill(morale[1]);
    text(morale[0], OUTSIDE + (SDIM / 4), 5.5 * SDIM / 8);

    const trust = getStat(currPiece.trust);
    fill(255);
    text('Trust: ', OUTSIDE + (SDIM / 4), 4.75 * SDIM / 4);
    fill(trust[1]);
    text(trust[0], OUTSIDE + (SDIM / 4), 3 * SDIM / 2);

    const health = getStat(currPiece.health);
    fill(255);
    text('Health: ', OUTSIDE + (SDIM / 4), 2 * SDIM);
    fill(health[1]);
    text(health[0], OUTSIDE + (SDIM / 4), 19 * SDIM / 8);
  }
  fill(100);
  textSize(28);
  let w = textWidth("Supplies: " + SUPP);
  rect(OUTSIDE + (SDIM / 6), OUTGIN + (SDIM * 3.5) + (SDIM / 6), w + SDIM/6, SDIM);
  fill(255);
  textAlign(LEFT, CENTER);
  text("Supplies: " + SUPP, OUTSIDE + (SDIM / 4), OUTGIN + (SDIM * 3.5) + (SDIM / 6) + SDIM / 2); //center text in box
}

function drawSupplies() {
  let boxWidth = 4 * SDIM; //width of whole left box
  let boxHeight = SDIM; //height of a single piece box
  let buffer = SDIM / 6;
  let boxLeft = OUTGIN - boxWidth - buffer; //left of left box
  let boxTop = OUTGIN; //top of left box
  let topBuffer = SDIM * 1.1; //distance from top screen to box
  let border = 10; //width of border around box
  let currY = -1;
  for (let i in PIECES) {
    if (PIECES[i].ident.color == "w") {
      strokeWeight(3);
      stroke(BACKGROUND); //create illusion of seperation between piece boxes
      //set background of rect to health color of each piece and draw rect
      let opacity = 50;
      if (currBox == currY) {
        opacity = 150;
        HOVERED = PIECES[i];
        if (mouseP) {
          giveFood(PIECES[i]);
          mouseP = false;
        }
      }
      c = hexToRgb(getStat(PIECES[i].health)[1]);
      fill(c['r'], c['g'], c['b'], opacity);
      rect(boxLeft, boxTop + (boxHeight * currY) + topBuffer - yScroll - border + 2, boxWidth, boxHeight);
      //alignment
      push();
      noStroke(); //so text doesn't have stroke
      fill(255);
      textAlign(LEFT, CENTER);
      textSize(24);
      //get image for piece and draw
      color = PIECES[i].ident.color == 'w' ? "white" : "black";
      getImage = ASSETS[color + PIECES[i].ident.type];

      const sc = (boxHeight * 0.6) / getImage.height;
      const wid = sc * getImage.width;
      const hei = sc * getImage.height;

      const midVert = boxTop + boxHeight * currY - yScroll + 3 * boxHeight / 2 + buffer - border + 2;
      const stText = boxTop - boxWidth + (3 * boxHeight / 4) - buffer;

      const imgCentHor = (boxLeft + stText) / 2;
      const imgCentVer = midVert;
      const imgCornHor = imgCentHor - (wid / 2);
      const imgCornVer = imgCentVer - (hei / 2);
      image(getImage, imgCornHor, imgCornVer - (buffer / 2), wid, hei);
      //draw piece name
      text(PIECES[i].name, stText, midVert); //3/2 for middle of box placement
      pop();
      currY++;
    }
  }
  noStroke();
  //fill rects that are background color over piece rects to make it look like scrolling
  //tiny box in between supplies box and pieces list
  //rect(boxLeft, OUTGIN + boxHeight, boxWidth, border);
  //fill and draw the rect behind supplies text
  fill(BACKGROUND);
  //box under list, continues downward forever (hence the 1000 for height)
  rect(boxLeft - border, SIDE + buffer - 2, boxWidth + border * 2, 1000);
  distFromTop = SDIM * 1.6;
  //box thats from top of screen to top of list
  rect(boxLeft - border, -distFromTop, boxWidth + border * 2, boxHeight - 1);

}

function checkHover() {
  for (let i in PIECES) {
    if (PIECES[i].overlapPoint(camera.mouseX, camera.mouseY) && PIECES[i].ident.color == "w") {
      HOVERED = PIECES[i];
      return;
    }
  }

  if (camera.mouseX > OUTGIN - 4 * SDIM - (SDIM / 6) && camera.mouseX < OUTGIN - (SDIM / 6) && camera.mouseY > OUTGIN) {
    currBox = Math.max(Math.round((camera.mouseY + yScroll) / SDIM) - 1, -1);
  } else {
    currBox = null;
  }
}

function convertMove(row, col) {
  return letters[col] + (row + 1);
}

function mouseOnBoard() {
  return ((camera.mouseX > ORIGIN && camera.mouseX < SIDE) && (camera.mouseY > ORIGIN && camera.mouseY < SIDE));
}

function checkLowStats() {
  for (let i in PIECES) {
    if (ROUND - PIECES[i].lastFed > 2 && PIECES[i].ident.type != 'k') {
      PIECES[i].health = Math.max(0, PIECES[i].health - 1);
    }
    if (PIECES[i].ident.color == 'w' && PIECES[i].ident.type != 'k') {
      if (tooLow(PIECES[i])) {
        CHESS.put({ type: PIECES[i].ident.type, color: 'b' }, convertMove(PIECES[i].row, PIECES[i].col));
        const spr = createSprite(PIECES[i].col * SDIM, (7 - PIECES[i].row) * SDIM);
        spr.ident = { type: PIECES[i].ident.type, color: 'b' };
        spr.row = PIECES[i].row;
        spr.col = PIECES[i].col;
        spr.addImage(ASSETS['black' + spr.ident.type]);
        spr.setCollider('rectangle', 0, 0, 20, 20);
        spr.scale = SDIM / 20;
        PIECES.push(spr);
        PIECES[i].remove();
        PIECES.splice(i, 1);
        if (yScroll > SDIM) yScroll -= SDIM;
      }
    }
  }
}

function tooLow(piece) {
  let rolls = 0;
  rolls += piece.morale;
  rolls += piece.trust;
  rolls += piece.health;
  return Math.floor(Math.random() * 6) < 6 - rolls;
}

function giveFood(piece) {
  if (SUPP > 0 && piece.health < 4) {
    SUPP--;
    piece.lastFed = ROUND;
    piece.health += 1;
  }
}

function getStat(num) {
  const table = [
    ['Miserable', '#e74c3c'],
    ['Poor', '#e67e22'],
    ['OK', '#dcf442'],
    ['Good', '#2ecc71'],
    ['Excellent', '#3498db']
  ];
  return table[num];
}

function movePossible(origin, prime) {
  if (CHESS.move({ from: origin, to: prime, promotion: 'q' }) != null) {
    CHESS.undo();
    return true;
  }
  return false;
}

function movePiece(origin, prime, isWhite, isKCastle, isQCastle, isPromote) {
  if (movePossible(origin, prime)) {
    let toBeSpliced = null;
    const color = isWhite ? 'w' : 'b';
    for (let i in PIECES) {
      if (PIECES[i].row + 1 == prime[1] && PIECES[i].col == prime.charCodeAt(0) - 97) {
        toBeSpliced = i;
        break;
      }
    }
    if (toBeSpliced != null) {
      if (PIECES[toBeSpliced].ident.color == 'w' && yScroll > SDIM) {
        yScroll -= SDIM;
      }
      PIECES[toBeSpliced].remove();
      PIECES.splice(toBeSpliced, 1);
    }

    if (isPromote) {
      for (let i in PIECES) {
        if (convertMove(PIECES[i].row, PIECES[i].col) == origin) {
          PIECES[i].addImage('queenPromote', ASSETS[(isWhite ? 'white' : 'black') + 'q']);
          PIECES[i].changeImage('queenPromote');
        }
      }
      CHESS.move({ from: origin, to: prime, promotion: 'q' });
    } else {
      CHESS.move({ from: origin, to: prime });
    }
    if (isKCastle) {
      for (let i in PIECES) {
        if (PIECES[i].ident.color == color && PIECES[i].ident.type == 'r') {
          if ((PIECES[i].row == 0 || PIECES[i].row == 7) && PIECES[i].col == 7) {
            if (color == 'b' && PIECES[i].row == 7) {
              PIECES[i].col = 5;
              PIECES[i].position.x = PIECES[i].col * SDIM;
            } else if (color == 'w' && PIECES[i].row == 0) {
              PIECES[i].col = 5;
              PIECES[i].position.x = PIECES[i].col * SDIM;
            }
          }
        }
      }
    }
    if (isQCastle) {
      for (let i in PIECES) {
        if (PIECES[i].ident.color == color && PIECES[i].ident.type == 'r') {
          if ((PIECES[i].row == 0 || PIECES[i].row == 7) && PIECES[i].col == 0) {
            if (color == 'b' && PIECES[i].row == 7) {
              PIECES[i].col = 3;
              PIECES[i].position.x = PIECES[i].col * SDIM;
            } else if (color == 'w' && PIECES[i].row == 0) {
              PIECES[i].col = 3;
              PIECES[i].position.x = PIECES[i].col * SDIM;
            }
          }
        }
      }
    }
    for (let i in PIECES) {
      if (PIECES[i].row + 1 == origin[1] && PIECES[i].col == origin.charCodeAt(0) - 97) {
        PIECES[i].row = prime[1] - 1;
        PIECES[i].col = prime.charCodeAt(0) - 97;
        PIECES[i].position.x = PIECES[i].col * SDIM;
        PIECES[i].position.y = (7 - PIECES[i].row) * SDIM;
        break;
      }
    }
    return true;
  }
  return false;
}

function createPieces() {
  let playerName = prompt("Enter a username");
  const rows = [7, 6, 1, 0];
  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 8; i++) {
      const spr = createSprite(i * SDIM, (7 - rows[j]) * SDIM);
      spr.ident = CHESS.get(convertMove(rows[j], i));
      let gender = "Boy";
      if (spr.ident.type == 'b' || spr.ident.type == 'q') gender = "Girl";
      else if (spr.ident.type == 'p') gender = Math.random() > 0.5 ? "Boy" : "Girl";
      list = (gender == "Boy") ? nameListBoy : nameListGirl;
      const ind = Math.floor(Math.random() * list.length);
      spr.name = spr.ident.type == 'k' ? playerName : list[ind];
      list.splice(ind, 1);
      spr.morale = spr.ident.type == 'k' ? 4 : Math.round(Math.random()) + 2;
      spr.trust = spr.ident.type == 'k' ? 4 : Math.round(Math.random()) + 2;
      spr.health = spr.ident.type == 'k' ? 4 : Math.round(Math.random()) + 2
      ;
      spr.lastFed = 0;
      spr.row = rows[j];
      spr.col = i;
      spr.addImage(ASSETS[(j < 2 ? 'black' : 'white') + spr.ident.type]);
      spr.setCollider('rectangle', 0, 0, 20, 20);
      spr.scale = SDIM / 20;
      PIECES.push(spr);
    }
  }
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    let text = xhr.responseText;
    lines = text.split("\n");
  }
}