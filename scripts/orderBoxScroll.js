

$(document).ready(function(){


    var headerHeight = document.getElementById('tabs').offsetHeight;
    margin = $('body').css('margin');
    margin = parseInt(margin, 10);
    headerHeight=headerHeight+margin;
    console.log(margin);

    document.getElementById('orderBox').style.top = headerHeight+"px";

    $(window).scroll(function(){
        var scrollDistance = $(document).scrollTop();
        if(scrollDistance > headerHeight) {
            document.getElementById('orderBox').style.top = "2px";

        } else {

            document.getElementById('orderBox').style.top = (headerHeight-scrollDistance)+"px";

        }
    })

});
