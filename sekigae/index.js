$(function(){
  var count = 0;
  var isResetScene = false;
  var $btnExport = $("#export-btn");
  var $btnImport = $("#import-btn");
  var $btnNo = $("#btn-accept");
  var $resetButton = $("#reset-btn");
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
      addMembers($nameList.val());
    }
  });
  
  function addMembers(entry){
    if(isResetScene){
      toggleReset();
    }else{
      member.push(entry);
      var $del = $("<span>").text("X").addClass("btn-delete");
      var $e = $("<div>").text(entry).attr("id", count).addClass("names").append($del).click(function(){
        $e.toggleClass("menu");
      });
      $del.click(function(){
        if($e.hasClass("removing")){
          return;
        }
        member.splice($(".names:not(.removed)").index($e), 1);
        $e.addClass("removed");
        setTimeout(function(){
          $e.css({height: "0px"});
        }, 800);
        setTimeout(function(){
          $e.remove();
        }, 1600);
      });
      $leaderboard.append($e);
      $e.innerHeight();
      $e.addClass("entries");
      $nameList.val("");
      console.log(member);
      count ++;
    }
  }
  
  function toggleReset(){
    $("#btn-accept").toggleClass("active");
    $("#input-box").toggleClass("active");
    $("#name-add").toggleClass("active");
    $("#btn-add").toggleClass("confirm");
    isResetScene = !isResetScene;
    console.log(isResetScene);
    if(isResetScene){
      $nameList.val("Are you sure?");
      $nameList.prop("disabled", "true");
      $addBtn.text("NO");
    }else{
      $nameList.val("");
      $nameList.prop("disabled", null);
      $addBtn.text("ADD");
    }
  }
  
  $btnNo.click(function(){
    toggleReset();
    member = [];
    $(".names").addClass("removed");
    setTimeout(function(){
      $(".names").remove();
    },800);
  });
  
  $resetButton.click(function(){
    toggleReset();
  });
  
  $btnExport.click(function(){
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(member));
    var dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "Members.json");
    dlAnchorElem.click();
  });
 
  $btnImport.click(function(){
    $("#json-import").click();
  });
  $('input[type=file]').on('change', function(e){
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = function(){
      member = [];
      var memberRead = JSON.parse(reader.result);
      console.log(memberRead);
      $(".names").addClass("removed");
      setTimeout(function(){
        $(".names").remove();
        for(var i = 0; i < memberRead.length; i++){
          addMembers(memberRead[i]);
        }
      },800);
    };
    reader.readAsText(file);
  });
});
