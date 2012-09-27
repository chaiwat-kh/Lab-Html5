var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    scaleCheckbox = document.getElementById('scaleCheckbox'),
    image = new Image();

function drawImage() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (scaleCheckbox.checked) {
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
    }
    else {
        context.drawImage(image, 0, 0);
    }
}

scaleCheckbox.onchange = function (e) {
    drawImage();
};

image.src = '/Content/themes/base/images/fence.JPG';
image.onload = function (e) {
    drawImage();
};