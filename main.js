const { app, ipcMain, BrowserWindow } = require('electron');
var spawn = require('child_process').spawn;
var os = require('os');

var py_obd = spawn('python', ['obd.py']);

py_obd.stdout.on('data', function(data){
    console.log(data.toString());
});

var options = {
    baudRate : 38400
};

var obd_data = {
    speed: 0,
    rpm: 0
};

var serialLocation = "/dev/serial";

if(os.type() == 'Darwin'){
    // Right sided port on Macbook Pro 2015
    serialLocation = "/dev/tty.usbserial-1420"
}

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
}

app.on('ready', createWindow);

ipcMain.on('request-obd-data', (event, arg) => {
   event.sender.send('obd-data', obd_data);
});




