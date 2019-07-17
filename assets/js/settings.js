$(function(){
    $(document).on('theme', function(e, v){
        if (v == "dark") {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="assets/themes/dark.css">');
            $('#theme-bulb').removeClass('dark-bulb');

        } else {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="assets/themes/light.css">');
            $('#theme-bulb').addClass('dark-bulb')
        }
    });
    $(document).on('safety', function(e, v){
        if (v) {
            $('#driver-safety').removeClass('off');
        } else {
            $('#driver-safety').addClass('off');
        }
    });
    $(document).on('scope', function(e, v){
        if (v == "imperial") {
            $('#scope').text('Imperial');
        } else {
            $('#scope').text('Metric');
        }
    });
    $(document).on('textSize', function(e, v){
        if(v <= 1){
            magnetCurs.disableTargetablity("#settingsTextsizeMinus");
        } else if(v >= 15){
            magnetCurs.disableTargetablity("#settingsTextsizePlus");
        } else {
            magnetCurs.enableTargetablity("#settingsTextsizeMinus");
            magnetCurs.enableTargetablity("#settingsTextsizePlus");
        }
    });
    $(document).on('magnetivety', function(e, v){
        if(v <= 1){
            magnetCurs.disableTargetablity("#settingsMagnetivetyMinus");
        } else if(v >= 25){
            magnetCurs.disableTargetablity("#settingsMagnetivetyPlus");
        } else {
            magnetCurs.enableTargetablity("#settingsMagnetivetyMinus");
            magnetCurs.enableTargetablity("#settingsMagnetivetyPlus");
        }
        magnetCurs.setMagnetivety(v);
    });
});