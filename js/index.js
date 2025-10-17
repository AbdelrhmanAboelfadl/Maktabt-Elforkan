$(document).ready(function() {
    $('#pagepiling').pagepiling({
    direction: 'vertical',
    navigation: false,
    scrollingSpeed: 700,
    anchors: ['section1', 'section2', 'section3'],
    afterLoad: function(anchorLink, index) {
        $(".navbar-nav li").removeClass("active");

        if (anchorLink === 'section1') {
        $(".navbar-nav li a[href='#section1']").parent().addClass("active");
        } 
        else if (anchorLink === 'section2') {
        $(".navbar-nav li a[href='#section2']").parent().addClass("active");
        } 
        else if (anchorLink === 'section3') {
        $(".navbar-nav li a[href='#section3']").parent().addClass("active");
        }
    }
    });
    $(".nav-link").click(function(e) {
    e.preventDefault();
    let target = $(this).attr("href").replace("#", "");
    $.fn.pagepiling.moveTo(target);
    });
});

$(".navbar-nav li").click(function () {
    addActiveToNavItem(this);
});

getData();
