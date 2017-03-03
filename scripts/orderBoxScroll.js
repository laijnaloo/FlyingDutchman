

$(document).ready(function(){

    margin = $('body').css('margin');
    margin = parseInt(margin, 10);
    var headerHeight = document.getElementById('tabs').offsetHeight;
    headerHeight=headerHeight+margin;
    document.getElementById('orderBox').style.top = headerHeight+"px";

    $(window).scroll(function(){
        var scrollDistance = $(document).scrollTop();
        if(scrollDistance > headerHeight) {
            document.getElementById('orderBox').style.top = "0px";

        } else {
            document.getElementById('orderBox').style.top = (headerHeight-scrollDistance)+"px";

        }
    })

});
