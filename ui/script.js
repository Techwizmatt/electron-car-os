$(function()
{
    loadContent('overview');
});

function loadContent(page)
{
    $('.content').fadeOut(300);
    setTimeout(function()
    {
        $('.content').load('pages/' + page + '.html', function()
        {
            $('.content').fadeIn(300);
        });
    }, 300);
}