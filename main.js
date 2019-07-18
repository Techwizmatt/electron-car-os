const { app, ipcMain, BrowserWindow } = require('electron');
var OBDReader = require('serial-obd');
var options = {};
options.baudRate = 38400;
// Right sided port on Macbook Pro 2015
var serialOBDReader = new OBDReader("/dev/tty.usbserial-1420", options);

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 480,
        frame: false,
        transparent: true,
        resizable: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Load the home page.
    win.loadFile('index.html')
    win.toggleDevTools()

}

app.on('ready', createWindow);


serialOBDReader.on('dataReceived', function (data) {
    console.log(data);
});

serialOBDReader.on('connected', function (data) {
    this.addPoller("rpm");

    this.startPolling(100); //Polls all added pollers each 250 ms.
});

serialOBDReader.connect();
