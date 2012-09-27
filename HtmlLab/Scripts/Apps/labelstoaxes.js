﻿var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),

    HORIZONTAL_AXIS_MARGIN = 50,
    VERTICAL_AXIS_MARGIN = 50,

    AXIS_ORIGIN = { x: HORIZONTAL_AXIS_MARGIN,
                    y: canvas.height - VERTICAL_AXIS_MARGIN },
    AXIS_TOP = VERTICAL_AXIS_MARGIN,
    AXIS_RIGHT = canvas.width - HORIZONTAL_AXIS_MARGIN,

    HORIZONTAL_TICK_SPACING = 10,
    VERTICAL_TICK_SPACING = 10,
    
    AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x,
    AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP,
    
    NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING,
    NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING,
    
    TICK_WIDTH = 10,
    SPACE_BETWEEN_LABELS_AND_AXIS = 20;

// Functions..........................................................
function drawAxes() {
    context.save();
    context.lineWidth = 1.0;
    context.fillStyle = 'rgba(100,140,230,0.8)';
    context.strokeStyle = 'navy';
    drawHorizontalAxis();
    drawVerticalAxis();
    context.lineWidth = 0.5;
    context.strokeStyle = 'navy';
    context.strokeStyle = 'darkred';
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
    context.restore();
}

function drawHorizontalAxis() {
    context.beginPath();
    context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
    context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
    context.stroke();
}
function drawVerticalAxis() {
    context.beginPath();
    context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
    context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
    context.stroke();
}
function drawVerticalAxisTicks() {
    var deltaY;
    for (var i = 1; i < NUM_VERTICAL_TICKS; ++i) {
        context.beginPath();
        if (i % 5 === 0) deltaX = TICK_WIDTH;
        else deltaX = TICK_WIDTH / 2;
        context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
        context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
        context.stroke();
    }
}
function drawHorizontalAxisTicks() {
    var deltaY;
    for (var i = 1; i < NUM_HORIZONTAL_TICKS; ++i) {
        context.beginPath();
        if (i % 5 === 0) deltaY = TICK_WIDTH;
        else deltaY = TICK_WIDTH / 2;
        context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y - deltaY);
        context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + deltaY);
        context.stroke();
    }
}

function drawAxisLabels() {
    context.fillStyle = 'blue';
    drawHorizontalAxisLabels();
    drawVerticalAxisLabels();
}
function drawHorizontalAxisLabels() {
    context.textAlign = 'center';
    context.textBaseline = 'top';
    for (var i = 0; i <= NUM_HORIZONTAL_TICKS; ++i) {
        if (i % 5 === 0) {
            context.fillText(i, AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + SPACE_BETWEEN_LABELS_AND_AXIS);
        } 
    }
}
function drawVerticalAxisLabels() {
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    for (var i = 0; i <= NUM_VERTICAL_TICKS; ++i) {
        if (i % 5 === 0) {
            context.fillText(i, AXIS_ORIGIN.x - SPACE_BETWEEN_LABELS_AND_AXIS, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
        } 
    }
}

function drawGrid(color, stepx, stepy) {
    context.save()
    context.shadowColor = undefined;
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.strokeStyle = color;
    context.fillStyle = '#ffffff';
    context.lineWidth = 0.5;
    context.fillRect(0, 0, context.canvas.width,
            context.canvas.height);

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

    context.restore();
}

// Initialization.....................................................
context.font = '13px Arial';
drawGrid('lightgray', 10, 10);
context.shadowColor = 'rgba(100,140,230,0.8)';
context.shadowOffsetX = 3;
context.shadowOffsetY = 3; 
context.shadowBlur = 5;
drawAxes();
drawAxisLabels();