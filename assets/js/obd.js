var obd_data = {
    speed: 0,
    rpm: 0
};

ipcRenderer.on('obd-data', (event, arg) => {
    obd_data = arg;

    $('#speed').text(obd_data.speed);

    console.log(obd_data);
});
