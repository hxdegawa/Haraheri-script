$(function(){
  var $title = $("#header");
  var $span = $("span");
  
  $title.addClass("spawn");
  $span.click(function(){
    $(this).toggleClass("hop");
  });
});