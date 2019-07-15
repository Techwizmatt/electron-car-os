var path = document.getElementById("path");
var pathDimensions = path.getTotalLength();

var counter = { var: 0 };
var tal = document.getElementById("speed-number");

var angle = 270;

var duga = 3.14*160*angle/180;

var segm = pathDimensions/5;

TweenLite.to(".line", 0.1, {rotationZ: "-45", ease:Linear.easeNone});

function setRPM(){
    TweenLite.to(".line", 1, {rotationZ: angle - 45, ease:Linear.easeNone});

    TweenMax.to(counter, 1, {
        var: 30,
        onUpdate: function () {
            tal.innerHTML = Math.ceil(counter.var);
        },
        ease:Linear.easeNone
    });
}

setRPM(0);