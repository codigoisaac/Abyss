const canvas = document.querySelector("#draw");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";

// enable to add shadow
// ctx.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = false;
let isResetPoint = true;

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  // reset point
  if (isResetPoint) {
    [lastX, lastY] = [e.offsetX, e.offsetY];
  }
});
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseout", () => (isDrawing = false));

function draw(e) {
  if (!isDrawing) return;

  // change color
  ctx.strokeStyle = `hsl(${hue}, 50%, 50%)`;

  // Draw!
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // mouse brush (remove to see bug)
  [lastX, lastY] = [e.offsetX, e.offsetY];
  // change color
  hue++;
  if (hue >= 360) {
    hue = 0;
  }

  // change Line Width
  if (isAutoLW) {
    if (ctx.lineWidth >= maxLW || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    direction ? ctx.lineWidth++ : ctx.lineWidth--;
    lineWInput.value = ctx.lineWidth;
  }
}

// Add Controls

let isAutoLW = true;
let maxLW = 200;

// Line Width
const lineWInput = document.querySelector("input[id=lineWidth]");
lineWInput.addEventListener("change", changeLineW);

function changeLineW() {
  ctx.lineWidth = lineWInput.value;
  if (lineWInput.value > maxLWInput.value) {
    maxLWInput.value = lineWInput.value;
  }
}

// Auto Line Width
const autoLWInput = document.querySelector("input[id=autoLineWidth]");
autoLWInput.addEventListener("change", toggleAutoLW);

function toggleAutoLW() {
  isAutoLW = autoLWInput.checked;
  maxLWInput.disabled = isAutoLW ? false : true;
}

// Max Line Width
const maxLWInput = document.querySelector("input[id=maxLineWidth]");
maxLWInput.addEventListener("change", () => (maxLW = maxLWInput.value));

// Reset Point
const resetPointInput = document.querySelector("input[id=resetPoint");
resetPointInput.addEventListener(
  "change",
  () => (isResetPoint = !isResetPoint)
);
