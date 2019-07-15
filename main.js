const { app, ipcMain, BrowserWindow } = require('electron');

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
    })

    // Load the home page.
    win.loadFile('index.html')

}

app.on('ready', createWindow);

ipcMain.on('mouse-speed', (event, arg) => {
    if (arg == "slow") {
        console.log("Slowing down cursor");
    } else if (arg == "reset") {
        console.log("Resetting the cursor speed");
    }
});