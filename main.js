const { app, ipcMain, BrowserWindow } = require('electron');
var OBDReader = require('serial-obd');
const log = require('electron-log');
var os = require('os');
var options = {};
var obd_data = {
    speed: 20,
    rpm: 3454
};
options.baudRate = 38400;

var serialLocation = "/dev/serial";

if(os.type() == 'Darwin'){
    // Right sided port on Macbook Pro 2015
    serialLocation = "/dev/tty.usbserial-1420"
}

var serialOBDReader = new OBDReader(serialLocation, options);

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1024,
        height: 600,
        frame: false,
        transparent: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the home page.
    win.loadFile('index.html');

    win.toggleDevTools();
    // win.setFullScreen(true);
    // win.setKiosk(true);

    // setTimeout(function(){
    //     //This for some reason likes to crash on RPI , So I need it in a timeout to be able to see the error.
    //     serialOBDReader.connect();
    // }, 1000);

}

app.on('ready', createWindow);

ipcMain.on('request-obd-data', (event, arg) => {
   event.sender.send('obd-data', obd_data);
});

serialOBDReader.on('dataReceived', function (data) {
    data.forEach(function(v){
        if('name' in v){
            var name = v['name'];
            var value = v['value'];

            if(name == 'vss'){
                obd_data.speed = value;
            }
            if(name == 'rpm'){
                obd_data.rpm = value;
            }
        }
    });
});

serialOBDReader.on('connected', function (data) {

    log.info("Connected to the OBD PORT");

    this.addPoller("rpm");
    this.addPoller("vss");

    this.startPolling(100); //Polls all added pollers each 250 ms.
});

