var canvas = document.getElementById("lol");
var ctx = canvas.getContext("2d");
var img = new Image();
var keys={};
document.onkeydown = function(e){
  keys[e.keyCode] = true;
};
document.onkeyup = function(e){
  keys[e.keyCode] = false;
};
img.onload = function(){
  loop();
};
img.src = "./hato.jpeg";

function loop(){
  if(keys[37]){
    player.x --;
  }
  if(keys[39]){
    player.x ++;
  }
  if(keys[38]){
    player.y --;
  }
  if(keys[40]){
    player.y ++;
  }
  ctx.clearRect(0, 0, 600, 400);
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.drawImage(img, -25, -25, 50, 50);
  ctx.restore();
  requestAnimationFrame(loop);
}
var player = {
  x: 0, 
  y: 0
};