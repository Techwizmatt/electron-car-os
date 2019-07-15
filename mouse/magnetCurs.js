const {ipcRenderer} = require('electron');

let magnetCurs = [];
magnetCurs.init = function(params) {
    if (!params) {
        params = {}
    }
    document.body.insertAdjacentHTML('afterbegin', '<div id="cursor"></div>');
    magnetCurs.cursor = document.getElementById('cursor');
    magnetCurs.cursor.style.position = "fixed"
    magnetCurs.cursor.style.pointerEvents = "none"
    if (params.pointer) {
        document.body.insertAdjacentHTML('afterbegin', '<div id="pointer"></div>');
        magnetCurs.pointar = document.getElementById('pointer');
        magnetCurs.pointar.style.position = "fixed"
        magnetCurs.pointar.style.pointerEvents = "none"
    }
    magnetCurs.targetable_list = document.getElementsByClassName('targetable');
    magnetCurs.moveEnable = !0;
    document.addEventListener('mousemove', function(e) {
        if (magnetCurs.moveEnable) {
            magnetCurs.cursor.style.left = e.clientX + 'px';
            magnetCurs.cursor.style.top = e.clientY + 'px';
            magnetCurs.cursor.style.transform = ""
        } else {
            if (params.shockable) {
                let intensity = 5;
                if (typeof params.shockable == 'number') {
                    if (params.shockable > 0 && params.shockable < 5) {
                        intensity = intensity - params.shockable
                    } else {
                        magnetCurs.error("spacing params need to be more than 0")
                    }
                } else {
                    magnetCurs.error("shockable params need to be a number")
                }
                magnetCurs.cursor.style.transform = "translate(" + e.movementX / intensity + "px, " + e.movementY / intensity + "px)"
            }
        }
        if (params.pointer) {
            magnetCurs.pointar.style.left = e.clientX + 'px';
            magnetCurs.pointar.style.top = e.clientY + 'px'
        }
    });
    for (let index = 0; index < magnetCurs.targetable_list.length; index++) {
        const element = magnetCurs.targetable_list[index];
        element.addEventListener('mouseenter', function(e) {
            magnetCurs.moveEnable = !1;
            magnetCurs.cursor.classList.add('magnet');
            let currentButton = e.currentTarget;
            let spacing = 10;
            if (params.spacing) {
                if (typeof params.spacing == 'number') {
                    if (params.spacing > 0) {
                        spacing = params.spacing
                    } else {
                        magnetCurs.error("spacing params need to be more than 0")
                    }
                } else {
                    magnetCurs.error("spacing params need to be a number")
                }
            }
            let cssProperty = [];
            cssProperty.width = currentButton.offsetWidth + (spacing * 2);
            cssProperty.height = currentButton.offsetHeight + (spacing * 2);
            cssProperty.left = currentButton.getBoundingClientRect().x - spacing;
            cssProperty.top = currentButton.getBoundingClientRect().y - spacing;
            cssProperty.borderRadius = parseInt(window.getComputedStyle(currentButton, null).getPropertyValue("border-radius").match(/\d+/g).map(Number));
            magnetCurs.cursor.style.left = cssProperty.left + 'px';
            magnetCurs.cursor.style.top = cssProperty.top + 'px';
            magnetCurs.cursor.style.width = cssProperty.width + 'px';
            magnetCurs.cursor.style.height = cssProperty.height + 'px';
            magnetCurs.cursor.style.margin = "0";
            magnetCurs.cursor.style.borderRadius = (cssProperty.borderRadius + 0) + 'px'
            //    Slow down the mouse speed here
            magnetCurs.pointar.style.display = "none";
            ipcRenderer.send('mouse-speed', 'slow');
        });
        element.addEventListener('mouseleave', function(e) {
            magnetCurs.moveEnable = !0;
            magnetCurs.cursor.classList.remove('magnet');
            magnetCurs.cursor.style.width = '';
            magnetCurs.cursor.style.height = '';
            magnetCurs.cursor.style.margin = '';
            magnetCurs.cursor.style.borderRadius = ''
            //    Reset the mouse speed here
            magnetCurs.pointar.style.display = "block";
            ipcRenderer.send('mouse-speed', 'reset');
        })
    }
    if (params.click) {
        document.addEventListener('click', function(e) {
            let time = 700;
            if (typeof params.click == 'number') {
                if (params.click > 0) {
                    time = params.click
                } else {
                    magnetCurs.error("click params need to be more than 0")
                }
            } else {
                magnetCurs.error("click params need to be a number")
            }
            magnetCurs.cursor.style.animation = "cursorClick " + time + "ms";
            setTimeout(() => {
                magnetCurs.cursor.style.animation = ""
            }, time)
        })
    }

}
magnetCurs.error = function(string) {
    console.error('Magnetic Cursor : ' + string)
}

magnetCurs.init({
    click:300,
    spacing:8,
    pointer:true,
    shockable:1
});

$(function() {
    var timeout;
    document.onmousemove = function(){
        clearTimeout(timeout);
        $("#cursor").fadeIn("fast");
        $("#pointer").fadeIn("fast");
        timeout = setTimeout(function(){
            $("#cursor").fadeOut("fast");
            $("#pointer").fadeOut("fast");
        }, 5000);
    }
});