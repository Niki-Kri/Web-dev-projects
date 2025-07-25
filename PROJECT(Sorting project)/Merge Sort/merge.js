let array = [];
let animations = [];
let currentStep = 0;
let hasAnnouncedSorted = false;

function initializeArray() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number).filter(n => !isNaN(n));

  if (array.length === 0) {
    alert("Please enter valid numbers separated by commas.");
    return;
  }

  animations = [];
  currentStep = 0;
  hasAnnouncedSorted = false;

  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("status").textContent = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("actionText").textContent = "Sorting started!";
  document.getElementById("nextBtn").style.display = "inline-block";

  if (isSorted(array)) {
    document.getElementById("status").textContent = "✅ Array is already sorted!";
    renderArray(array);
    return;
  }

  mergeSort(array.slice(), 0, array.length - 1);
  renderArray(array);
}

function isSorted(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i - 1] > arr[i]) return false;
  }
  return true;
}

function renderArray(arr, highlight = []) {
  const container = document.getElementById("arrayDisplay");
  container.innerHTML = "";

  const max = Math.max(...arr);
  arr.forEach((val, idx) => {
    const bar = document.createElement("div");
    bar.className = "array-bar";
    bar.style.height = `${(val / max) * 100}%`;
    bar.textContent = val;

    if (highlight.includes(idx)) {
      bar.style.backgroundColor = "crimson";
    }

    container.appendChild(bar);
  });
}

function mergeSort(arr, left, right) {
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  mergeSort(arr, left, mid);
  mergeSort(arr, mid + 1, right);
  merge(arr, left, mid, right);
}

function merge(arr, left, mid, right) {
  let temp = [];
  let i = left;
  let j = mid + 1;

  while (i <= mid && j <= right) {
    animations.push({
      type: "compare",
      indices: [i, j],
      snapshot: array.slice()
    });

    if (array[i] <= array[j]) {
      temp.push(array[i++]);
    } else {
      temp.push(array[j++]);
    }
  }

  while (i <= mid) temp.push(array[i++]);
  while (j <= right) temp.push(array[j++]);

  for (let k = left; k <= right; k++) {
    array[k] = temp[k - left];
    animations.push({
      type: "overwrite",
      index: k,
      value: array[k],
      snapshot: array.slice()
    });
  }
}

function nextStep() {
  if (currentStep >= animations.length) {
    document.getElementById("status").textContent = "✅ Array is fully sorted!";
    document.getElementById("loopInfo").textContent = "Merge sort complete.";
    document.getElementById("actionText").textContent = "Sorting complete.";
    document.getElementById("nextBtn").style.display = "none";
    return;
  }

  const step = animations[currentStep];
  document.getElementById("loopInfo").textContent = `🔁 Loop No. ${currentStep + 1}`;

  if (step.type === "compare") {
    renderArray(step.snapshot, step.indices);
    document.getElementById("actionText").textContent = `🔍 Comparing index ${step.indices[0]} and ${step.indices[1]}`;
    addMove(`Compare: index ${step.indices[0]} and ${step.indices[1]}`);
  } else if (step.type === "overwrite") {
    renderArray(step.snapshot, [step.index]);
    document.getElementById("actionText").textContent = `📌 Inserting ${step.value} at index ${step.index}`;
    addMove(`Insert: ${step.value} at index ${step.index}`);

    if (!hasAnnouncedSorted && isSorted(step.snapshot)) {
      document.getElementById("status").textContent = "🎉 Array just got sorted!";
      hasAnnouncedSorted = true;
    }
  }

  currentStep++;
}

function addMove(text) {
  const li = document.createElement("li");
  li.textContent = text;
  document.getElementById("moveHistory").appendChild(li);
}

function resetAll() {
  array = [];
  animations = [];
  currentStep = 0;
  hasAnnouncedSorted = false;
  document.getElementById("arrayDisplay").innerHTML = "";
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("status").textContent = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("actionText").textContent = "Press 'Start Sorting' to begin.";
  document.getElementById("arrayInput").value = "";
  document.getElementById("nextBtn").style.display = "none";
}
