

$(document).ready(function(){
    var headerHeight = document.getElementById('tabs').offsetHeight;

    //Calculates the initial top position for the orderBox
    margin = $('body').css('margin');
    margin = parseInt(margin, 10);
    var headerHeight = document.getElementById('tabs').offsetHeight;
    headerHeight=headerHeight+margin;

    //Sets the top position for the orderBox
    document.getElementById('orderBox').style.top = headerHeight+"px";

    //Calculates the new top position when the user is scrolling on the page, and moves
    //the orderBox accordingly so it is positioned at the top at all times.
    $(window).scroll(function(){ //Runs the function when the user scrolls on the page.
        var scrollDistance = $(document).scrollTop(); //This equals how far the user has scrolled on the page
        //Sets the new top position
        if(scrollDistance > headerHeight) {
            document.getElementById('orderBox').style.top = "0px";

        } else {
            document.getElementById('orderBox').style.top = (headerHeight-scrollDistance)+"px";
        }
    })
});
