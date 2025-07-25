let array = [];
let i = 1;
let j;
let key;
let isSorted = false;
let sorting = false;

function initializeArray() {
  const input = document.getElementById("arrayInput").value.trim();

  // Validate input
  if (!input) {
    alert("Please enter numbers separated by commas!");
    return;
  }

  // Clean input: remove extra spaces, empty strings, and invalid entries
  array = input
    .split(",")
    .map(x => x.trim())
    .filter(x => x !== "" && !isNaN(x))
    .map(Number);

  if (array.length === 0) {
    alert("Please enter valid numbers!");
    return;
  }

  // Reset variables
  i = 1;
  j = undefined;
  isSorted = false;
  sorting = true;

  // Reset UI
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("arrayDisplay").innerText = "";
  document.getElementById("status").innerText = "";
  document.getElementById("loopInfo").innerText = "";
  document.getElementById("nextBtn").style.display = "inline-block";

  displayArray();
}

function displayArray() {
  document.getElementById("arrayDisplay").innerText = `Array: [ ${array.join(", ")} ]`;
}

function logMove(text) {
  const li = document.createElement("li");
  li.innerText = text;
  document.getElementById("moveHistory").appendChild(li);
}

function isArraySorted(arr) {
  for (let k = 0; k < arr.length - 1; k++) {
    if (arr[k] > arr[k + 1]) return false;
  }
  return true;
}

function nextStep() {
  if (!sorting) return;

  // ✅ Final stopping condition
  if (i >= array.length) {
    const statusE1=document.getElementById("status");
    statusE1.innerText = "✅ Loop completed. Final array is fully sorted.";
    statusE1.style.color="green";
    document.getElementById("loopInfo").innerText = `Final i = ${i} (end of loop)`;
    document.getElementById("nextBtn").style.display = "none";
    sorting = false;
    return;
  }

  // Begin step if not already inside
  if (j === undefined) {
    key = array[i];
    j = i - 1;
    logMove(`🔑 Step ${i}: Key = ${key}`);
    document.getElementById("loopInfo").innerText = `Loop i = ${i}, starting j = ${j}`;
  }

  // Inner loop of insertion sort
  if (j >= 0 && array[j] > key) {
    array[j + 1] = array[j];
    logMove(`  🔁 Shift ${array[j]} → position ${j + 1}`);
    j--;
    displayArray();
    document.getElementById("loopInfo").innerText = `Loop i = ${i}, j = ${j}`;
  } else {
    array[j + 1] = key;
    logMove( `✅ Insert ${key} at position ${j + 1}`);
    displayArray();

    // 🎉 Sorted detection
    if (!isSorted && isArraySorted(array)) {
      isSorted = true;
      const statusE2=document.getElementById("status");
      statusE2.innerText = `🎉 Array sorted at step ${i}. Continuing until loop ends...`;
      statusE2.style.color="orange";
    }

    i++;
    j = undefined;
  }
}

function resetAll() {
  array = [];
  i = 1;
  j = undefined;
  isSorted = false;
  sorting = false;

  document.getElementById("arrayInput").value = "";
  document.getElementById("arrayDisplay").innerText = "";
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("loopInfo").innerText = "";
  document.getElementById("status").innerText = "";
  document.getElementById("nextBtn").style.display = "none";
}