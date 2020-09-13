// ********************** DRAW ****************** 

// for marking if pencil is hold or not
let isMouseDown = false;

// store all the points,that i draw
let undoStack = [];
// push those points ,that i removed from undostack
let redoStack = [];

board.addEventListener('mousedown',function(e){
    // drawing start

    // The beginPath() method is called before beginning each line
    ctx.beginPath();

    let top=getLocation();
    // move pointer to a location without drawing

    let point = {
        x: e.clientX,
        y: e.clientY - top,
        identifier: "mousedown",
        color: ctx.strokeStyle,
        width: ctx.lineWidth
    };
    undoStack.push(point);
    ctx.moveTo(e.clientX,e.clientY-top);
    isMouseDown=true;
    socket.emit("mousedown", point);
});

board.addEventListener('mousemove',function(e)
{
    if(isMouseDown==true)
    {
        let top=getLocation();
        let point = {
            x: e.clientX,
            y: e.clientY - top,
            identifier: "mousemove",
            color: ctx.strokeStyle,
            width: ctx.lineWidth
        };
        undoStack.push(point);
        // make line from previous position to this position
        ctx.lineTo(e.clientX,e.clientY-top);
        // render line
        ctx.stroke();
        socket.emit("mousemove", point);
    }
});

board.addEventListener("mouseup", function (e) {
    isMouseDown = false;
});


// ********************** UNDO / REDO ****************** 
const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
let interval=null;
undo.addEventListener('mousedown',function(e)
{
    interval=setInterval(function()
    {
        if(undoMaker())
        {
            socket.emit("undo");
        }
    },50);
});

undo.addEventListener('mouseup',function(e)
{
    clearInterval(interval);
});

redo.addEventListener('mousedown',function(e)
{
    interval=setInterval(function()
    {
        if(redoMaker())
        {
            socket.emit("redo");
        }
    },50);
});

redo.addEventListener('mouseup',function(e)
{
    clearInterval(interval);
});

function undoMaker()
{
    if(undoStack.length>0)
    {
        redoStack.push(undoStack.pop());
        redraw();
        return true;
    }
    return false;
}

function redoMaker()
{
    if(redoStack.length>0)
    {
        undoStack.push(redoStack.pop());
        redraw();
        return true;
    }
    return false;
}

function redraw()
{
    // clear board
    ctx.clearRect(0,0,board.height,board.width);

    // redraw all points
    for(let i=0;i<undoStack.length;i++)
    {
        let {x,y,identifier,color,width} = undoStack[i];
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if(identifier=='mousedown')
        {
            ctx.moveTo(x,y);
            isMouseDown=true;
        }
        else if(identifier=='mousemove')
        {
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
}

function getLocation() {
    const { top } = board.getBoundingClientRect();
    return top;
}
