const fs = require('fs');
// const bluetooth = require('node-bluetooth');

const settings_file = "data/settings.car";
let settings = {};
let internal_cache = {
    page:""
};

var settingsEvent = function(k, v)
{
    console.error('Declare function window.settingsEvent(key, value){} in your code to use the realtime feature');
}

try
{
    if(fs.existsSync(settings_file))
    {
        fs.readFile(settings_file, function(err, data)
        {
            if(err) throw err
            settings = JSON.parse(data);
        });
    }
    else
    {
        fs.writeFile(settings_file, JSON.stringify(settings), function(err)
        {
            if(err) throw err
        });
    }
}
catch(err)
{
    console.error(err)
}

var object_watch = {
    cache: settings,
    runtime: function()
    {
        if(JSON.stringify(settings) != JSON.stringify(object_watch.cache))
        {
            jQuery.each(settings, function(k, v)
            {
                if(typeof object_watch.cache[k] == "undefined" | object_watch.cache[k] != v)
                {
                    $(document).trigger(k, [v]);
                }
            });
            fs.writeFile(settings_file, JSON.stringify(settings), function(err)
            {
                if(err) throw err
            })
            object_watch.cache = JSON.parse(JSON.stringify(settings));
        }
        setTimeout(object_watch.runtime, 100);
    }
}

object_watch.runtime();

$(function()
{
    if(typeof settings.page == "undefined")
    {
        settings.page = "overview";
    }
    loadContent(settings.page);

});

function loadContent(page, require_internet)
{
    if(internal_cache.page != page)
    {
        if(typeof require_internet !== "undefined" && require_internet == true && navigator.onLine == false)
        {
            alert("Internet connection required!");
        }
        else
        {
            $('.content').fadeOut(300, function(){
                $('.content').load('pages/' + page + '.html', function()
                {
                    magnetCurs.refresh();
                    internal_cache.page = page;
                    settings.page = page;
                    $('.content').fadeIn(300);
                });
            });
        }
    }
}

function toggleWarning()
{
    $('.warning').fadeToggle(300);
    magnetCurs.refresh();
}
