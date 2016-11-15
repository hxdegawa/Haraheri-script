$(function(){
  var btnA = $("#btn-A");
  var btnB = $("#btn-B");
  var btnC = $("#btn-C");
  var btnD = $("#btn-D");
  var sarchBox = $("#sarch-box");
  var sarch = $("#sarch-input");
  
  
  sarch.focusin(function(){
    sarchBox.addClass("focused");
  });
  sarch.focusout(function(){
    sarchBox.removeClass("focused");
  });
});