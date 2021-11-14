let selectObtn = document.querySelector(".playerO");
let selectXbtn = document.querySelector(".playerX");
let playBoard = document.querySelector(".play-board");
let welcome = document.querySelector(".welcome");
let players = document.querySelector(".players");
let allBox = document.querySelectorAll("section div");
let resultBox = document.querySelector(".result-box");
let wonText = document.querySelector(".won-text");
let replayBtn = document.getElementById("replay");

window.onload = () => {
  for (let i = 0; i < allBox.length; i++) {
    //add onclick attribute in all available span
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }
  selectXbtn.addEventListener("click", function () {
    playBoard.classList.add("show");
    welcome.classList.add("hide");
  });
  selectObtn.addEventListener("click", function () {
    playBoard.classList.add("show");
    welcome.classList.add("hide");
    players.setAttribute("class", "players active player");
  });
};
let xicon = "fas fa-times";
let oicon = "far fa-circle";
let psign = "x";
let runBot = true;
function clickedBox(element) {
  if (players.classList.contains("player")) {
    sign = "o";
    element.innerHTML = `<i class="${oicon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", "o");
  } else {
    element.innerHTML = `<i class="${xicon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", "x");
  }
  selectWinner();
  element.style.pointerEvents = "none";
  let randomTimeDelay = (Math.random() * 1000 + 200).toFixed(); //generating random number so bot will randomly delay to select unselected box
  setTimeout(() => {
    bot(); //calling bot function
  }, randomTimeDelay); //passing random delay value
}
function bot() {
  let arr = [];
  if (runBot) {
    for (let i = 0; i < allBox.length; i++) {
      if (allBox[i].childElementCount == 0) {
        arr.push(i);
      }
    }
    let randomNumber = arr[Math.floor(Math.random() * arr.length)];
    if (arr.length > 0) {
      if (players.classList.contains("player")) {
        allBox[randomNumber].setAttribute("id", "x");
        allBox[randomNumber].innerHTML = `<i class="${xicon}"></i>`;
        players.classList.remove("active");
      } else {
        allBox[randomNumber].innerHTML = `<i class="${oicon}"></i>`;
        psign = "o";
        players.classList.remove("active");
        allBox[randomNumber].setAttribute("id", "o");
      }

      selectWinner();
    }
    allBox[randomNumber].style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto"; //add pointerEvents auto in playboard so user can again click on box
    psign = "x";
  }
}

function getIdVal(classname) {
  return document.querySelector(".box" + classname).id; //return id value
}
function checkIdSign(val1, val2, val3, sign) {
  //checking all id value is equal to sign (X or O) or not if yes then return true
  if (getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign) {
    return true;
  }
}
function selectWinner() {
  //if the one of following winning combination match then select the winner
  if (
    checkIdSign(1, 2, 3, "x") ||
    checkIdSign(4, 5, 6, "x") ||
    checkIdSign(7, 8, 9, "x") ||
    checkIdSign(1, 4, 7, "x") ||
    checkIdSign(2, 5, 8, "x") ||
    checkIdSign(3, 6, 9, "x") ||
    checkIdSign(1, 5, 9, "x") ||
    checkIdSign(3, 5, 7, "x")
  ) {
    runBot = false; //passing the false boolen value to runBot so bot won't run again
    bot(); //calling bot function
    setTimeout(() => {
      //after match won by someone then hide the playboard and show the result box after 700ms
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700); //1s = 1000ms
    wonText.innerHTML = `Player <p>x</p> won the game!`; //displaying winning text with passing playerSign (X or O)
  } else if (
    checkIdSign(1, 2, 3, "o") ||
    checkIdSign(4, 5, 6, "o") ||
    checkIdSign(7, 8, 9, "o") ||
    checkIdSign(1, 4, 7, "o") ||
    checkIdSign(2, 5, 8, "o") ||
    checkIdSign(3, 6, 9, "o") ||
    checkIdSign(1, 5, 9, "o") ||
    checkIdSign(3, 5, 7, "o")
  ) {
    runBot = false; //passing the false boolen value to runBot so bot won't run again
    bot(); //calling bot function
    setTimeout(() => {
      //after match won by someone then hide the playboard and show the result box after 700ms
      resultBox.classList.add("show");
      playBoard.classList.remove("show");
    }, 700); //1s = 1000ms
    wonText.innerHTML = `Player <p>o</p> won the game!`; //displaying winning text with passing playerSign (X or O)
  } else {
    //if all boxes/element have id value and still no one win then draw the match
    if (getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != "") {
      runBot = false; //passing the false boolen value to runBot so bot won't run again
      bot(); //calling bot function
      setTimeout(() => {
        //after match drawn then hide the playboard and show the result box after 700ms
        resultBox.classList.add("show");
        playBoard.classList.remove("show");
      }, 700); //1s = 1000ms
      wonText.textContent = "Match has been drawn!"; //displaying draw match text
    }
  }
}
replayBtn.onclick = () => {
  window.location.reload(); //reload the current page on replay button click
};
