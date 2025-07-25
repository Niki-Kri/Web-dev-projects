// Dark mode toggle
const toggle = document.getElementById('modeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Game redirects
function openGame(game) {
  switch (game) {
    case 'simon':
      window.location.href = "./Simon Game Project/index.html";
      break;
    case 'drum':
      window.location.href = "./PROJECT(drum-kit)/Drum Kit Starting Files/drum.html";
      break;
    case 'batball':
      window.location.href = "./PROJECT(Bat ball stump)/bat ball project.html";
      break;
    case 'dice':
      window.location.href = "./PROJECT(Dice Game)/dice.html";
      break;
  }
}

// Back button
function goBack() {
  window.location.href = "../index.html";;
}