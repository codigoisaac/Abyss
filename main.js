// Set Canvas
const canvas = document.querySelector("#draw");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Set Context
const ctx = canvas.getContext("2d");
ctx.lineJoin = "round";
ctx.lineCap = "round";

// enable to add shadow
// ctx.globalCompositeOperation = "multiply";

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Get mouse events on canvas
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

// CONTROLS
// Line Width
let maxLW = 200;
const lineWInput = document.querySelector("#lineWidth");
lineWInput.addEventListener("change", () => {
  ctx.lineWidth = lineWInput.value;
  if (lineWInput.value > maxLW) {
    maxLWInput.value = lineWInput.value;
  }
});

// Auto Line Width
let isAutoLW = true;
const autoLWInput = document.querySelector("#autoLineWidth");
autoLWInput.addEventListener("change", () => {
  isAutoLW = autoLWInput.checked;
  maxLWInput.disabled = isAutoLW ? false : true; // toggle disabled
});

// Max Line Width
const maxLWInput = document.querySelector("#maxLineWidth");
maxLWInput.addEventListener("change", () => {
  maxLW = maxLWInput.value;
  if (maxLW < lineWInput.value) {
    lineWInput.value = maxLWInput.value;
  }
});

// Auto color
let isAutoColor = true;
const autoColor = document.querySelector("#autoColor");
autoColor.addEventListener("change", () => (isAutoColor = autoColor.checked));

// Color hsl
let hue = 0;
let saturation = 50;
let lightness = 50;

// Hue
const hueIn = document.querySelector("#hue");
hueIn.addEventListener("change", () => (hue = hueIn.value));
// Saturation
const satIn = document.querySelector("#saturation");
satIn.addEventListener("change", () => (saturation = satIn.value));
// Lightness
const ligIn = document.querySelector("#lightness");
ligIn.addEventListener("change", () => (lightness = ligIn.value));

// Reset Point
let isResetPoint = true;
const resetPointInput = document.querySelector("#resetPoint");
resetPointInput.addEventListener(
  "change",
  () => (isResetPoint = !isResetPoint)
);

let direction = false;

function draw(e) {
  if (!isDrawing) return;

  // color
  ctx.strokeStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;

  // change color
  if (isAutoColor) {
    hue++;
    if (hue >= 360) {
      hue = 0;
    }
  }

  // Draw!
  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  // mouse brush (remove to see bug)
  [lastX, lastY] = [e.offsetX, e.offsetY];

  // change Line Width
  if (isAutoLW) {
    if (ctx.lineWidth >= maxLW || ctx.lineWidth <= 1) {
      direction = !direction; // bug when maxLW > LW
      // now we have to bring ctx.lineWidth back till it
      // becomes less than maxLW or more than 1 again
    }
    direction ? ctx.lineWidth++ : ctx.lineWidth--;
    lineWInput.value = ctx.lineWidth;
  }
}
