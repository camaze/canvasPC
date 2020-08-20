var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

// 1. 设置画板大小
autoSetCanvasSize(yyy);

// 2. 监听鼠标
listenToMouse(yyy);

// 3. 橡皮擦
/* eraser */
var eraserEnabled = false;
eraser.onclick = function () {
    eraserEnabled = true;
    actions.className = 'actions x';
}

brush.onclick = function () {
    eraserEnabled = false;
    actions.className = 'actions';
}


/* functions */
function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize();
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth;
        var pageHeight = document.documentElement.clientHeight;
        canvas.width = pageWidth;
        canvas.height = pageHeight;
    }
}

function listenToMouse(canvas) {

    var painting = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    };
    canvas.onmousedown = function (aaa) {
        var x = aaa.clientX;
        var y = aaa.clientY;
        painting = true;
        if (eraserEnabled) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            context.clearRect(x - 5, y - 5, 10, 10);
        } else {
            //   drawCircle(x,y,1);
            lastPoint = {
                x: x,
                y: y
            };
        }
    }

    canvas.onmousemove = function (aaa) {
        var x = aaa.clientX;
        var y = aaa.clientY;
        //没有使用画线或橡皮擦直接退出函数
        if (!painting) {
            return
        }
        if (eraserEnabled) {
            context.clearRect(x - 5, y - 5, 10, 10)
        } else {
            var newPoint = {
                x: x,
                y: y
            };
            //     drawCircle(x,y,1);
            drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
            lastPoint = newPoint;
        }
    }

    canvas.onmouseup = function (aaa) {
        painting = false;
    }
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