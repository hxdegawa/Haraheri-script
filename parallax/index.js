$(function(){
  var $infoScroll = $("#parallax-info-scroll");
  $(window).on("scroll", function(e){
    $infoScroll.text(window.scrollY);
  });
});
