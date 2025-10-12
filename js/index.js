$(document).ready(function() {

    $('#pagepiling').pagepiling({
        direction: 'vertical', 
        scrollingSpeed: 300,    
        navigation: {           
        'position': 'right',
        'tooltips': ['Section 1', 'Section 2', 'Section 3']
        }
    });

});
$(".navbar-nav li").click(function () {
    addActiveToNavItem(this);
});
