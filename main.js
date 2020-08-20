var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var painting = false;
var lastPoint = {
    x: undefined,
    y: undefined
};
adjustScreen();

window.onresize = function () {
    adjustScreen();
}


// context.fillStyle='blue';
// context.fillRect(0,0,100,100);

yyy.onmousedown = function (aaa) {
    console.log(aaa);
    painting = true;
    var x = aaa.clientX;
    var y = aaa.clientY;
    //   drawCircle(x,y,1);
    lastPoint = {
        x: x,
        y: y
    };
}

yyy.onmousemove = function (aaa) {
    if (painting) {
        var x = aaa.clientX;
        var y = aaa.clientY;
        var newPoint = {
            x: x,
            y: y
        };
        //     drawCircle(x,y,1);
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
        lastPoint = newPoint;
    }
}

yyy.onmouseup = function (aaa) {
    painting = false;
}

function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black'
    context.lineWidth = 5;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function adjustScreen() {
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    yyy.width = pageWidth;
    yyy.height = pageHeight;
}