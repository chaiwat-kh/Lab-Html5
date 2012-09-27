var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    image = new Image(),
    scaleSlider = document.getElementById('scaleSlider'),
    scale = 1.0,
    MINIMUM_SCALE = 1.0,
    MAXIMUM_SCALE = 3.0;
// Functions...........................................................
function drawImage() {
    var w = canvas.width,
        h = canvas.height,
        sw = w * scale,
        sh = h * scale;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
}
function drawScaleText(value) {
    var text = parseFloat(value).toFixed(2);
    var percent = parseFloat(value - MINIMUM_SCALE) / parseFloat(MAXIMUM_SCALE - MINIMUM_SCALE);
        scaleOutput.innerText = text;
        percent = percent < 0.35 ? 0.35 : percent;
        scaleOutput.style.fontSize = percent * MAXIMUM_SCALE / 1.5 + 'em';
}
// Event handlers......................................................
scaleSlider.onchange = function (e) {
    scale = e.target.value;
    if (scale < MINIMUM_SCALE) scale = MINIMUM_SCALE;
    else if (scale > MAXIMUM_SCALE) scale = MAXIMUM_SCALE;
    drawScaleText(scale);
    drawImage();
};

// Initialization......................................................
context.fillStyle = 'cornflowerblue';
context.strokeStyle = 'yellow';
context.shadowColor = 'rgba(50, 50, 50, 1.0)';
context.shadowOffsetX = 5;
context.shadowOffsetY = 5;
context.shadowBlur = 10;

image.src = '/Content/themes/base/images/fence.JPG';
image.onload = function (e) {
    drawImage();
    drawScaleText(scaleSlider.value);
};