let array = [];
let i = 0;
let j = 0;
let moveHistory = [];
let isSorted = false;
let earlySorted = false;

function initializeArray() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  i = 0;
  j = i + 1;
  moveHistory = [];
  isSorted = false;
  earlySorted = false;
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("status").textContent = "";
  document.getElementById("nextBtn").style.display = "inline-block";
  updateDisplay();
}

function updateDisplay(extra = '') {
  document.getElementById("arrayDisplay").textContent = "Array: " + array.join(", ");
  document.getElementById("loopInfo").textContent = `Outer Loop i = ${i}, Inner Loop j = ${j} ${extra}`;
}

function isArraySorted(arr) {
  for (let x = 0; x < arr.length - 1; x++) {
    if (arr[x] > arr[x + 1]) return false;
  }
  return true;
}

function nextStep() {
  if (isSorted || i >= array.length - 1) {
    document.getElementById("status").textContent = "✅ Array is fully sorted!";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  let minIndex = i;

  // Find the minimum index in the remaining array
  for (let k = i + 1; k < array.length; k++) {
    if (array[k] < array[minIndex]) {
      minIndex = k;
    }
  }

  // Swap if needed
  if (minIndex !== i) {
    let temp = array[i];
    array[i] = array[minIndex];
    array[minIndex] = temp;
    moveHistory.push(`Swapped index ${i} and ${minIndex} → [${array.join(", ")}]`);
  } else {
    moveHistory.push(`No swap needed at index ${i}`);
  }

  // Log the move
  let li = document.createElement("li");
  li.textContent = moveHistory[moveHistory.length - 1];
  document.getElementById("moveHistory").appendChild(li);

  // Check for early sorting
  if (!earlySorted && isArraySorted(array)) {
    earlySorted = true;
    document.getElementById("status").textContent = "✔ Array is already sorted, continuing remaining loops...";
    document.getElementById("status").style.color = "orange";
  }

  // Advance loop
  i++;
  j = i + 1;

  if (i >= array.length - 1) {
    isSorted = true;
    document.getElementById("status").textContent = "✅ All passes completed! Final array is sorted!";
    document.getElementById("status").style.color = "green";
    document.getElementById("nextBtn").style.display = "none";
  }

  updateDisplay(earlySorted ? "(sorted early)" : "");
}

function resetAll() {
  document.getElementById("arrayInput").value = "";
  array = [];
  i = 0;
  j = 0;
  moveHistory = [];
  isSorted = false;
  earlySorted = false;
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("arrayDisplay").textContent = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("status").textContent = "";
  document.getElementById("status").style.color = "";
  document.getElementById("nextBtn").style.display = "none";
}