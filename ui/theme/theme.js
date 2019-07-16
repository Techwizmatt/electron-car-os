$(function(){
    $(document).on('theme', function(e, v){
        if (v == "dark") {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="ui/theme/dark.css">');
            $('#theme-bulb').removeClass('dark-bulb');

        } else {
            $('.theme').html('<link rel="stylesheet" type="text/css" href="ui/theme/light.css">');
            $('#theme-bulb').addClass('dark-bulb')
        }
    });
});