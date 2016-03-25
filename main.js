'use strict';

var chosenWord = '';
var wrongGuesses = 0;
var spaceArray = [];
var finished = false;
newGame();

function newGame(){
  chosenWord = randWord();
  wrongGuesses = 0;
  spaceArray = [];
  finished = false;
  resetDisplay();
  generateSpaces();
  generateKeyboard();
}

function randWord() {
  // pick random number between 0 and 125
  var rand = Math.floor(Math.random() * 125);
  return words[rand].toLowerCase();
}

function resetDisplay() {
  document.getElementById('game-display').innerHTML = `
    <span>______</span><br>
    <span>|&nbsp;&nbsp;&nbsp;&nbsp;|</span><br>
    <span id="head">|</span><br>
    <span id="chest">|</span><br>
    <span id="torso">|</span><br>
    <span id="legs">|</span><br>
    <span>|</span> <br>
    <span>==========</span>
  `
}

function generateSpaces() {
  for (let i = 0; i < chosenWord.length; i++) {
    spaceArray.push('_')
  }
  document.getElementById('spaces').innerHTML = spaceArray.join(' ');
}

function generateKeyboard() {
  var keyTemplate = '';
  for (let i in letters) {
    keyTemplate += `<div style="margin-left:${i}em;">`
    for (let j in letters[i]) {
      let char = letters[i][j];
      keyTemplate += `<button id="${char}-key" class="key" onclick="pressKey('${char}')"> ${char} </button>`
    }
    keyTemplate += "</div>"
  }
  document.getElementById('keyboard').innerHTML = keyTemplate;
}

function pressKey(letter){
  var key = document.getElementById(letter + '-key');
  if (key.className.match('selected')) {
    return;
  }
  key.className += ' selected';

  if (chosenWord.indexOf(letter) > -1) {
    for (let i = 0; i < chosenWord.length; i++) {
      if (chosenWord[i] === letter) {
        spaceArray[i] = letter;
      }
    }
    document.getElementById('spaces').innerHTML = spaceArray.join(' ');
  } else {
    wrongGuesses++;
    addBodyPart();
  }
  checkForEnd();
}

function addBodyPart() {
  var template = '|&nbsp;&nbsp;&nbsp;&nbsp;'
  switch (wrongGuesses) {
    case 1:
      document.getElementById('head').innerHTML = template + 'O';
      break;
    case 2:
      document.getElementById('chest').innerHTML = template + '|';
      break;
    case 3:
      document.getElementById('chest').innerHTML = '|&nbsp;&nbsp;&nbsp;/|';
      break;
    case 4:
      document.getElementById('chest').innerHTML = '|&nbsp;&nbsp;&nbsp;/|\\';
      break;
    case 5:
      document.getElementById('torso').innerHTML = template + '|';
      break;
    case 6:
      document.getElementById('legs').innerHTML = '|&nbsp;&nbsp;&nbsp;/';
      break;
    case 7:
      document.getElementById('legs').innerHTML = '|&nbsp;&nbsp;&nbsp;/&nbsp;\\';
      break;
    default: return;
  }
}

function checkForEnd() {
  if (spaceArray.indexOf('_') === -1) {
    endGame(true);
  }
  else if (wrongGuesses > 6) {
    endGame(false);
  }
}

function endGame(win){
  var endTemplate = '';
  if (win) { endTemplate += '<h1> YOU FUCKING WIN</h1>'; }
  else { endTemplate += '<h1> YOU LOSE, IDIOT </h1>'; }
  endTemplate += '<button class="play-again" onclick="newGame()">Play again</button>';
  document.getElementById('keyboard').innerHTML = endTemplate;

  document.getElementById('spaces').innerHTML = chosenWord.split('').join(' ');
  finished = true;
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    var letter = evt.code.replace('Key', '').toLowerCase();
    if (alphabet.match(letter) && !finished) { pressKey(letter); }
};
