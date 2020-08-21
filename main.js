var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
// context.strokeStyle = 'red'    //必须在设定好画板大小后才有用。


// 1. 设置画板大小
autoSetCanvasSize(yyy);

context.strokeStyle = 'red' //初始颜色

// 2. 监听用户行为 分为鼠标和触摸板
listenToUser(yyy);

// 3. 橡皮擦
/* eraser */
var eraserEnabled = false;
// brush.onclick = function () {
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active')
    eraser.classList.remove('active')
    // actions.className = 'actions';
}

eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active')
    pen.classList.remove('active')
    // actions.className = 'actions x';
}

// 4. 不同颜色画笔
red.onclick = function () {
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
}

green.onclick = function () {
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}

blue.onclick = function () {
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
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

function listenToUser(canvas) {
    if (document.body.ontouchstart !== undefined) {
        // 支持触摸
        var painting = false;
        var lastPoint = {
            x: undefined,
            y: undefined
        };
        canvas.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
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
        canvas.ontouchmove = function (aaa) {
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
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
        canvas.ontouchend = function () {
            painting = false;
        }
    } else {
        // 不支持触摸，用鼠标
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

        canvas.onmouseup = function () {
            painting = false;
        }
    }
}

function drawCircle(x, y, radius) {
    context.beginPath();
    // context.fillStyle = 'black';
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill();
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'red'
    context.lineWidth = 5;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}