let array = [];
let i = 0;
let j = 0;
let moveHistory = [];
let isSorted = false;
let earlySorted = false;

function initializeArray() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number).filter(x => !isNaN(x));
  i = 0;
  j = 0;
  moveHistory = [];
  isSorted = false;
  earlySorted = false;

  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("status").textContent = "";
  document.getElementById("status").style.color = "";
  document.getElementById("nextBtn").style.display = "inline-block";
  updateDisplay();
}

function updateDisplay(extra = '') {
  document.getElementById("arrayDisplay").textContent = "Array: " + array.join(", ");
  document.getElementById("loopInfo").textContent = `Outer Loop i = ${i}, Inner Loop j = ${j} ${extra}`;
}

function isArraySorted(arr) {
  for (let k = 0; k < arr.length - 1; k++) {
    if (arr[k] > arr[k + 1]) return false;
  }
  return true;
}

function nextStep() {
  if (isSorted || i >= array.length - 1) {
    document.getElementById("status").textContent = "✅ Array is fully sorted!";
    document.getElementById("status").style.color = "green";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  if (j < array.length - i - 1) {
    let msg = '';
    if (array[j] > array[j + 1]) {
      // Swap
      [array[j], array[j + 1]] = [array[j + 1], array[j]];
      msg = `Swapped index ${j} and ${j + 1} → [${array.join(", ")}]`;
    } else {
      msg = `Checked index ${j} and ${j + 1} → No swap`;
    }

    moveHistory.push(msg);
    const li = document.createElement("li");
    li.textContent = msg;
    document.getElementById("moveHistory").appendChild(li);

    j++;
  } else {
    i++;
    j = 0;
  }

  if (!earlySorted && isArraySorted(array)) {
    earlySorted = true;
    document.getElementById("status").textContent = "✔ Array is already sorted, continuing remaining loops...";
    document.getElementById("status").style.color = "orange";
  }

  if (i >= array.length - 1) {
    isSorted = true;
    document.getElementById("status").textContent = "✅ All passes complete! Final array is sorted!";
    document.getElementById("status").style.color = "green";
    document.getElementById("nextBtn").style.display = "none";
  }

  updateDisplay(earlySorted ? "(sorted early)" : "");
}

function resetAll() {
  array = [];
  i = 0;
  j = 0;
  moveHistory = [];
  isSorted = false;
  earlySorted = false;
  document.getElementById("arrayInput").value = "";
  document.getElementById("arrayDisplay").textContent = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("status").textContent = "";
  document.getElementById("status").style.color = "";
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
}