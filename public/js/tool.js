// connect to socket server
const socket = io.connect("http://localhost:3000/");
// document => actual html
// get an html canvas element 
const board=document.querySelector('.board');

// browser tab=> window
// canvas dimensions= browser dimensions
board.height = window.innerHeight;
board.width = window.innerWidth;

// ***********************  SET PENCIL PROPERTIES **********************

// to get pencil to draw in 2d
const ctx = board.getContext('2d');

// set pencil color
ctx.strokeStyle = "blue";
//  drawing doen't pixelate on zoomin
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
// line end
ctx.lineCap = "round";
// when two lines meet ,differnece between them
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
// width of pencil
ctx.lineWidth = 3;

// ************************Change Size**************************//
function sizeChange(value) {
    ctx.lineWidth = value;
    socket.emit("size", value);
}


// ************************* TOOL CHANGE ****************************
function handleLocaltoolChange(tool) {
    handleToolChange(tool);
    if (tool != "sticky");
        socket.emit("toolchange", tool);
}

// ******************handle color****************************
function handleColorChange(color) {
    ctx.strokeStyle = color;
    socket.emit("color", color);
}
  
const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function() {
    handleHamburger();
    socket.emit("hamburger");
});