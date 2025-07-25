const toggle = document.getElementById("themeToggle");
toggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", toggle.checked);
});

// Back button
function goBack() {
  window.location.href = "../index.html";
}