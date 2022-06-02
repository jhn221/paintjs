const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const lineBtn = document.getElementById("jsLine");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 4;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
        ctx.closePath();
    }
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true) {
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}
function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM (event) {
    event.preventDefault();
}

function handleSaveClick () {
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "Download_Paint[🎨]";
    link.click ();
}
if(lineBtn){
function handledrawLine (event) {
  //  const ex = event.offsetX;
  //  const ey = event.offsetY;
  //  if (drawing) {
  //      ctx.putImageData(backup, 0, 0);
  //      ctx.beginPath();
  //      ctx.moveTo(x, y);
  //      ctx.lineTo(ex, ey);
  //      ctx.stroke();
 // const x = event.offsetX;
 // const y = event.offsetY;
    backup = ctx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  if(!painting){
    ctx.putImageData(backup, 0, 0);
      ctx.beginPath();
      ctx.moveTo(x, y);
  } else {
      ctx.lineTo(x,y);
      ctx.stroke();

    }
}
}
if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
    canvas.addEventListener("mousedown",handledrawLine);
}

Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
if (lineBtn) {
    lineBtn.addEventListener("click",handledrawLine);
}