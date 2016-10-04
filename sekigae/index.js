$(function(){
  var count = 0;
  var $btnStart = $("#start");
  var $nameList = $("#name-add");
  var $changeName = $("#VariableName");
  var $addBtn = $("#btn-add");
  var $leaderboard = $("#leaderboards");
  var preLeaderboard = "<p class='names'></p>"
  var member = []
  var memberClose = [];
  
  $btnStart.click(function(){
    $("body").addClass("active");
    setTimeout(function(){
      $btnStart.remove();
      $("body").removeClass("active");
      $(".top").removeClass("after");
    }, 1000);
  });
  
  $addBtn.click(function(){
    if($nameList.val().trim()){
      
      
      
      $("<div id='VariableName' class='names'>Hello</div>").appendTo(document.getElementById("leaderboards"));
      $("#VariableName").text($nameList.val());
      $("#VariableName").attr("id", count);
      member.push($nameList.val());
      console.log(member);
      count ++;
      
    }
  });
  
  $(".names").click(function(){
    alert("hmm?");
  });
});