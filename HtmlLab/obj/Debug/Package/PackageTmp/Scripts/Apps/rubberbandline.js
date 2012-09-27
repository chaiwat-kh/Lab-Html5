var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    strokestyle = document.getElementById('strokeStyleSelect'),
    objectselect = document.getElementById('objectSelect'),
    drawingSurface,
    rubberbandRect = {},
    objecttype,
    dragging = false,
    ERASE_WIDHT = 20,
    mousedown = {};        

function windowToCanvas(x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width / bbox.width),
        y: y - bbox.top * (canvas.height / bbox.height)
    };
}
function rubberStart(loc) {
    mousedown.x = loc.x;
    mousedown.y = loc.y;
    dragging = true;
}

function strokeLine(loc) {
    context.beginPath();
    context.moveTo(mousedown.x, mousedown.y);
    context.lineTo(loc.x, loc.y);
    context.stroke();
}

function clearRect(loc) {
    context.clearRect(rubberbandRect.left, rubberbandRect.top, rubberbandRect.width, rubberbandRect.height);
}

// Rubber bands
function updateRubberbandRect(loc){
    rubberbandRect.width = Math.abs(loc.x - mousedown.x);
    rubberbandRect.height = Math.abs(loc.y - mousedown.y);

    if(loc.x > mousedown.x) rubberbandRect.left = mousedown.x;
    else rubberbandRect.left = loc.x;

    if(loc.y > mousedown.y) rubberbandRect.top = mousedown.y;
    else rubberbandRect.top = loc.y;
}

function saveDrawingSurface() {
    drawingSurface = context.getImageData(0, 0, canvas.width, canvas.height);
}
function restoreDrawingSurface() {
    if(drawingSurface)
        context.putImageData(drawingSurface, 0, 0);
}


canvas.onmousedown = function (e) {
    var lor = windowToCanvas(e.clientX, e.clientY);
    e.preventDefault();
    if (objecttype === 'draw') {
        restoreDrawingSurface();
        saveDrawingSurface();

    }
    rubberStart(lor);
}

canvas.onmousemove = function (e) {

    if (objecttype === 'erase') {
        e.preventDefault();
        restoreDrawingSurface();
        var x = e.clientX,
            y = e.clientY;
        var loc = windowToCanvas(x, y);

        context.beginPath();
        context.fillStyle = 'white';
        context.strokeStyle = 'black';

        context.fillRect(loc.x - ERASE_WIDHT / 2, loc.y - ERASE_WIDHT / 2, ERASE_WIDHT, ERASE_WIDHT);
        context.strokeRect(loc.x - ERASE_WIDHT / 2, loc.y - ERASE_WIDHT / 2, ERASE_WIDHT, ERASE_WIDHT);
    }

    if (dragging) {
        e.preventDefault();

        var x = e.clientX,
            y = e.clientY;
        restoreDrawingSurface();
        var loc = windowToCanvas(x, y);
        updateRubberbandRect(loc);

        if (objecttype === 'draw') {
            strokeLine(loc);
        }
        else {

            context.beginPath();
            context.clearRect(loc.x - ERASE_WIDHT / 2, loc.y - ERASE_WIDHT / 2, ERASE_WIDHT, ERASE_WIDHT);
            saveDrawingSurface();
        }
    }
}

canvas.onmouseup = function (e) {
    if (dragging) {
        var x = e.clientX,
            y = e.clientY;

        restoreDrawingSurface();
        var loc = windowToCanvas(x, y);
        updateRubberbandRect(loc);

        if (objecttype == 'draw') {
            strokeLine(loc);
            saveDrawingSurface();
        }
        else {
            //clearRect(loc);
        }

        dragging = false;
        
    }
}

strokestyle.onchange = function (e) {
    context.strokeStyle = strokestyle.value;
}

objectselect.onchange = function (e) {
    objecttype = objectselect.value;
    if (objecttype === 'erase') {
        canvas.style.cursor = 'pointer';
        context.lineWidth = 1;
        context.lineJoin = 'miter';
    }
    else {
        canvas.style.cursor = 'crosshair';
        context.lineWidth = 10.0;
        context.lineCap = 'round';
        context.lineJoin = 'bevel';
        context.strokeStyle = strokestyle.value
    }
}

context.strokeStyle = strokestyle.value;
context.lineWidth = 10.0;
context.lineCap = 'round';
context.lineJoin = 'bevel';
objecttype = objectselect.value;


