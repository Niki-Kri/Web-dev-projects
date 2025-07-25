let array = [];
let steps = [];
let stepIndex = 0;
let isSorted = false;

function initializeArray() {
  const input = document.getElementById("arrayInput").value;
  array = input.split(",").map(Number);
  steps = [];
  stepIndex = 0;
  isSorted = false;

  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("status").textContent = "";

  quickSort([...array], 0, array.length - 1);
  displayArray(array);

  document.getElementById("nextBtn").style.display = "inline-block";
}

function resetAll() {
  array = [];
  steps = [];
  stepIndex = 0;
  isSorted = false;
  document.getElementById("arrayInput").value = "";
  document.getElementById("arrayDisplay").innerHTML = "";
  document.getElementById("moveHistory").innerHTML = "";
  document.getElementById("loopInfo").textContent = "";
  document.getElementById("status").textContent = "";
  document.getElementById("nextBtn").style.display = "none";
}

function displayArray(currentArray = array, highlights = {}) {
  const container = document.getElementById("arrayDisplay");
  container.innerHTML = "";

  const maxVal = Math.max(...currentArray);
  const maxHeight = 200;

  currentArray.forEach((num, idx) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("bar-wrapper");

    const bar = document.createElement("div");
    bar.classList.add("bar");

    const height = (num / maxVal) * maxHeight;
    bar.style.height = `${height}px`;

    if (idx === highlights.pivot) bar.classList.add("pivot");
    else if (idx === highlights.left || idx === highlights.right) bar.classList.add("compare");
    else if (highlights.sortedIndices && highlights.sortedIndices.includes(idx)) bar.classList.add("sorted");

    const label = document.createElement("span");
    label.classList.add("bar-label");
    label.textContent = num;

    wrapper.appendChild(bar);
    wrapper.appendChild(label);
    container.appendChild(wrapper);
  });
}

function logMove(message) {
  const moveHistory = document.getElementById("moveHistory");
  const li = document.createElement("li");
  li.textContent = message;
  moveHistory.appendChild(li);
  moveHistory.scrollTop = moveHistory.scrollHeight;
}

function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function quickSort(arr, low, high) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  } else if (low === high) {
    steps.push({
      array: [...arr],
      message: `Element ${arr[low]} is already in place.`,
      highlights: { sortedIndices: [low] }
    });
  }
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;

  steps.push({
    array: [...arr],
    message: `📌Choosing pivot ${pivot} at index ${high}`,
    highlights: { pivot: high }
  });

  for (let j = low; j < high; j++) {
    steps.push({
      array: [...arr],
      message: `📊Comparing ${arr[j]} with pivot ${pivot}`,
      highlights: { left: j, pivot: high }
    });

    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      steps.push({
        array: [...arr],
        message: `↔️Swapped ${arr[i]} and ${arr[j]}`,
        highlights: { left: i, right: j }
      });
    }
  }

  swap(arr, i + 1, high);
  steps.push({
    array: [...arr],
    message: `Placing pivot ${pivot} at correct position`,
    highlights: { left: i + 1, pivot: high }
  });

  steps.push({
    array: [...arr],
    message: `Pivot ${pivot} is now in correct position`,
    highlights: { sortedIndices: [i + 1] }
  });

  return i + 1;
}

function nextStep() {
  if (stepIndex < steps.length) {
    const step = steps[stepIndex];
    array = step.array;
    displayArray(array, step.highlights);
    document.getElementById("loopInfo").textContent = `Step ${stepIndex + 1} of ${steps.length}`;
    document.getElementById("status").textContent = step.message;
    logMove(step.message);
    stepIndex++;

    // ✅ Show "sorted" message at end
    if (stepIndex === steps.length) {
      isSorted = true;
      document.getElementById("status").textContent = "✅ Array is sorted .";
      logMove("✅ Array is sorted.");
      document.getElementById("nextBtn").style.display = "none"; // ✅ Hide button after last step
    }
  } else {
    logMove("🔁 No more steps. Reset to sort again.");
  }
}
