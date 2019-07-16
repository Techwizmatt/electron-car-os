$(function(){

    //Theme
    $(document).on('theme', function(e, v){
        if (v == "dark") {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="ui/theme/dark.css">');
            $('#theme-bulb').removeClass('dark-bulb');

        } else {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="ui/theme/light.css">');
            $('#theme-bulb').addClass('dark-bulb')
        }
    });

    $(document).on('safety', function(e, v){
        console.log(v);
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
});