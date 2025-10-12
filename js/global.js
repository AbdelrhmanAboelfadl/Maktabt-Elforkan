function addActiveToNavItem(that) {
    $(document).ready(function() {
    $(".navbar-nav li").removeClass("active").delay(500); 
    $(that).addClass("active");
    
});
};