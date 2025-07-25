// Dark mode toggle
const toggle = document.getElementById('modeToggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('dark');
});

// Game redirects
function openGame(game) {
  switch (game) {
    case 'sportify':
      window.location.href = "./Sportify Clone/sportify.html";
      break;
    case 'myntra':
      window.location.href = "./PROJECT(Myntra)/myntra.html";
      break;
  }
}

// Back button
function goBack() {
  window.location.href = "../index.html";;
}