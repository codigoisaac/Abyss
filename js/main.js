// Set Canvas
const canvas = document.querySelector("canvas");
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
// Auto Line Width
const autoLWInput = document.querySelector("#autoLineWidth");
autoLWInput.addEventListener("change", toggleAutoLW);
let isAutoLW = true;
// Line Width
const LWInput = document.querySelector("#lineWidth");
LWInput.addEventListener("change", changeLWInput);
let lw = LWInput.value;
// Max Line Width
const maxLWInput = document.querySelector("#maxLineWidth");
maxLWInput.addEventListener("change", changeMaxLWInput);
let maxLW = maxLWInput.value;

function toggleAutoLW() {
  isAutoLW = autoLWInput.checked;
  maxLWInput.disabled = isAutoLW ? false : true;
}
function changeLWInput() {
  lw = LWInput.value;
  ctx.lineWidth = lw;
  if (lw > maxLW) {
    maxLWInput.value = lw;
  }
}
function changeMaxLWInput() {
  maxLW = maxLWInput.value;
  if (maxLW < lw) {
    LWInput.value = maxLW;
    ctx.lineWidth = LWInput.value;
    lw = LWInput.value;
  }
}

// Auto color
let isAutoColor = true;
const autoColor = document.querySelector("#autoColor");
autoColor.addEventListener("change", () => (isAutoColor = autoColor.checked));

// HSL Picker
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

  // change Line Width
  if (isAutoLW) {
    if (ctx.lineWidth > maxLWInput.value || ctx.lineWidth <= 1) {
      direction = !direction;
    }
    direction ? ctx.lineWidth++ : ctx.lineWidth--;
    LWInput.value = ctx.lineWidth;
    lw = ctx.lineWidth;
  }

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
}
