var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    dragging = false;

function drawGrid(context, color, stepx, stepy) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    for (var i = stepx + 0.5; i < canvas.width; i += stepx) {
        context.beginPath();
        context.moveTo(i, 0);
        context.lineTo(i, canvas.height);
        context.stroke();
    }
    for (var i = stepy + 0.5; i < canvas.height; i += stepy) {
        context.beginPath();
        context.moveTo(0, i);
        context.lineTo(canvas.width, i);
        context.stroke();
    }
}

function drawTwoArcs() {
    context.beginPath();

    //context.arc(250, 190, 300, 0, Math.PI * 2, false);
    context.arc(300, 190, 150, 0, Math.PI * 2, true);
    context.arc(250, 190, 75, 0, Math.PI * 2, false);
    context.arc(400, 190, 40, 0, Math.PI * 2, false);
    context.fill();

    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.stroke();
}

function draw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    drawGrid(context, 'lightgray', 10, 10);
    context.save();

    context.shadowColor = 'rgba(0,0,0,0.8)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;

    drawTwoArcs();

    context.restore();
}

canvas.onmousedown = function (e) {    
}
window.onmousemove = function (e) {    
}

context.fillStyle = 'rgba(100,140,230,0.5)';
context.strokeStyle = 'red';
draw();