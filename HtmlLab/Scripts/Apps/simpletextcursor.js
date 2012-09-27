var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    drawingSurfaceImageData,
    
    GRID_STROKE_STYLE = 'lightgray',
    GRID_HORIZONTAL_SPACING = 10, 
    GRID_VERTICAL_SPACING = 10,

    blinkingInterval,
    BLINK_ON = 500,
    BLINK_OFF = 500,

    cursor = new TextCursor();

function blinkCursor(loc) {
    blinkingInterval = setInterval(function (e) {
        cursor.erase(context, drawingSurfaceImageData);
        setTimeout(function (e) {
            cursor.draw(context, cursor.left, cursor.top + cursor.getHeight(context));
        }, BLINK_OFF);
    }, BLINK_ON + BLINK_OFF);
}

function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0,canvas.width,canvas.height);
}
function moveCursor(loc) {
    cursor.erase(context, drawingSurfaceImageData);
    cursor.draw(context, loc.x, loc.y);
    if (!blinkingInterval)
        blinkCursor(loc);
}
function drawGrid(color, stepx, stepy) {
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

canvas.onmousedown = function (e) {
    var loc = windowToCanvas(e);
    moveCursor(loc);
};

drawGrid(GRID_STROKE_STYLE,GRID_HORIZONTAL_SPACING,GRID_VERTICAL_SPACING);
saveDrawingSurface();