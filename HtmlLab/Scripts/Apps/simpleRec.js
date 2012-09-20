var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    gradient = context.createLinearGradient(0, 0, canvas.width, 0),
    SHADOW_COLOR = 'rgba(0,0,0,0.7)';

    context.lineJoin = 'round';
    context.lineWidth = 30;

    context.shadowColor = SHADOW_COLOR;
    context.shadowOffsetX = -4;
    context.shadowOffsetY = -4;
    context.shadowBlur = 5;

    context.font = '24px Helvetica';
    //context.fillText('หหหหหหหหหหหหหหหหห', 10, 10);
    context.transform(1, 1, -1, 1, 0, 0);
    context.fillText('Click anywhere to erase', 175, 200);
    context.setTransform(1, 0, 0, 1, 0, 0);

    context.strokeStyle = 'hsla(40,82%,33%,0.6)';
    //HSLA (hue/saturation/lightness/alpha)
    //RGBA (red/green/blue/alpha)
    context.fillStyle = 'rgba(0,0,255,0.5)';

    context.strokeRect(15, 15, 200, 200);
    context.fillRect(325, 100, 200, 200);

    for (var i = 0; i < 100; i++) {
        var tmp = '';
        tmp = i * 2;
        var sty = 'rgba(' + tmp + ',0,255,0.5)';
//        console.log(sty);
        context.fillStyle = sty;
        context.fillRect(75, 400 + i , 100, 1);
    }

    gradient.addColorStop(0, 'blue');
    gradient.addColorStop(0.25, 'white');
    gradient.addColorStop(0.5, 'purple');
    gradient.addColorStop(0.75, 'red');
    gradient.addColorStop(1, 'yellow');
    context.fillStyle = gradient;
    context.fillRect(325, 401, 100, 100);

context.canvas.onmousedown = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
};