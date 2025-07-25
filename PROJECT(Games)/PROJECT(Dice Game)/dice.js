
function rollDice() {

  const button = document.getElementById("roll-button");
  button.disabled = true;
  button.textContent = "Rolling...";


  const audio = new Audio("dice-142528.mp3");
  audio.play();


  setTimeout(function () {

    const playerRoll = Math.floor(Math.random() * 6) + 1;
    const computerRoll = Math.floor(Math.random() * 6) + 1;

    document.querySelectorAll("img")[0].setAttribute("src", "./images/dice" + playerRoll + ".png");
    document.querySelectorAll("img")[1].setAttribute("src", "./images/dice" + computerRoll + ".png");

    let resultText = "";
    if (playerRoll > computerRoll) {
      resultText = "🎉 Player Won!";
    } else if (computerRoll > playerRoll) {
      resultText = "🤖 Computer Won!";
    } else {
      resultText = "🤝 It's a Tie!";
    }

    const resultElement = document.getElementById("result-text");
    resultElement.textContent = resultText;
    button.disabled = false;
    button.textContent = "🎲 Roll Dice";
  }, 2000);
}

document.getElementById("roll-button").addEventListener("click", rollDice);
