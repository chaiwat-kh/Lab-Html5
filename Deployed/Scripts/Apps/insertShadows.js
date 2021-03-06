﻿var drawingContext = document.getElementById('drawingCanvas').getContext('2d'),
    ERASER_LINE_WIDTH = 1,
    ERASER_SHADOW_STYLE = 'blue',
    ERASER_STROKE_STYLE = 'rgba(0,0,255,0.6)',
    ERASER_SHADOW_OFFSET = -5,
    ERASER_SHADOW_BLUR = 20,
    ERASER_RADIUS = 60;

//    drawingContext.fillText ('TESTxxxxxxxxxxxxxxxxxxxxxxxxx', 200, 200);
//    drawingContext.fillStyle = 'hsla(40,82%,33%,0.6)',
Loc = {};

drawingContext.fillRect(325, 100, 200, 200);
    

// Eraser........................................................
function setEraserAttributes() {
    drawingContext.lineWidth = ERASER_LINE_WIDTH;
    drawingContext.shadowColor = ERASER_SHADOW_STYLE;
    drawingContext.shadowOffsetX = ERASER_SHADOW_OFFSET;
    drawingContext.shadowOffsetY = ERASER_SHADOW_OFFSET;
    drawingContext.shadowBlur = ERASER_SHADOW_BLUR;
    drawingContext.strokeStyle = ERASER_STROKE_STYLE;
}
function drawEraser(loc) {
    drawingContext.save();
    setEraserAttributes();
    drawingContext.beginPath();
    drawingContext.arc(loc.x, loc.y, ERASER_RADIUS,0, Math.PI * 2, false);
    drawingContext.clip();
    drawingContext.stroke();
    drawingContext.restore();
}

window.onmousedown = function (e) {
    Loc.x = e.clientX;
    Loc.y = e.clientY;

    drawEraser(Loc);
}

