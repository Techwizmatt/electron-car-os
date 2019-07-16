const fs = require('fs');
const settings_file = "data/settings.car";
let settings = {};
let internal_cache = {};

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
    loadContent('overview');
});

function loadContent(page)
{
    $('.content').fadeOut(300);
    connect($('.content'), "test");
    setTimeout(function()
    {
        $('.content').load('pages/' + page + '.html', function()
        {
            magnetCurs.refresh();

            $('.content').fadeIn(300);
        });
    }, 300);
}

function connect(element, variable)
{
    $(element).html(settings[variable]);
    if(typeof internal_cache["connections"] == "undefined")
    {
        internal_cache["connections"] = {};
    }
    if(typeof internal_cache.connections[variable] == "undefined")
    {
        internal_cache.connections[variable] = [];
    }
    internal_cache.connections[variable].push(element);
}

function toggleWarning()
{
    $('.warning').fadeToggle(300);
    magnetCurs.refresh();
}