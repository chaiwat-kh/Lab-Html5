var context = document.getElementById('canvas').getContext('2d');
var x1, x2, x3, x4, x5, x6, x7, x8, y1, y2, y3, y4, y5, y6, y7, y8;

function roundedRect(cornerX, cornerY, width, height, cornerRadius) {
    if (width > 0) context.moveTo(cornerX + cornerRadius, cornerY);
    else context.moveTo(cornerX - cornerRadius, cornerY);

    context.arcTo(cornerX + width, cornerY, cornerX + width, cornerY + height, cornerRadius);
    x1 = cornerX + width, y1 = cornerY, x2 = cornerX + width, y2 = cornerY + height;
    
    context.arcTo(cornerX + width, cornerY + height, cornerX, cornerY + height, cornerRadius);
    x3 = cornerX + width, y3 = cornerY + height, x4 = cornerX, y4 = cornerY + height;
    
    context.arcTo(cornerX, cornerY + height, cornerX, cornerY, cornerRadius);
    x5 = cornerX, y5 = cornerY + height, x6 = cornerX, y6 = cornerY;
    if (width > 0) {
        context.arcTo(cornerX, cornerY, cornerX + cornerRadius, cornerY, cornerRadius);
        x7 = cornerX, y7 = cornerY, x8 = cornerX + cornerRadius, y8 = cornerY;
    }
    else {
        context.arcTo(cornerX, cornerY, cornerX - cornerRadius, cornerY, cornerRadius);
        x7 = cornerX, y7 = cornerY, x8 = cornerX - cornerRadius, y8 = cornerY;
    }
}

function drawRoundedRect(strokeStyle, fillStyle, cornerX, cornerY, width, height, cornerRadius) {
    context.beginPath();
    roundedRect(cornerX, cornerY, width, height, cornerRadius);
    context.strokeStyle = strokeStyle;
    context.fillStyle = fillStyle;
    context.stroke();
    context.fill();
}
// Initialization................................................
drawRoundedRect('blue', 'yellow', 200, 200, 100, 100, 20);

context.beginPath();
context.fillStyle = 'red';
context.arc(x1, y1, 2, 0, Math.PI * 2);
context.fill();

context.beginPath();
context.fillStyle = 'blue';
context.arc(x3, y3, 2, 0, Math.PI * 2);
context.fill();

context.beginPath();
context.fillStyle = 'green';
context.arc(x5, y5, 2, 0, Math.PI * 2);
context.fill();

context.beginPath();
context.fillStyle = 'orange';
context.arc(x7, y7, 2, 0, Math.PI * 2);
context.fill();