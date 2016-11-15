var canvas = document.getElementById("lol");
var ctx = canvas.getContext("2d");
var img = new Image();
var keys={};
document.onkeydown = function(e){
  keys[e.keyCode] = keys[e.keyCode] ? keys[e.keyCode] + 1 : 1;
};
document.onkeyup = function(e){
  keys[e.keyCode] = 0;
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
  if(keys[32] === 1){
    bullets.push(new Bullet(player.x, player.y, 0, -2));
    keys[32] ++;
  }
  ctx.clearRect(0, 0, 600, 400);
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.drawImage(img, -25, -25, 50, 50);
  ctx.restore();
  ctx.fillStyle = "#FA0";
  for(var i = bullets.length - 1;i>=0; i --){
    var bullet = bullets[i];
    bullet.update();
    if(bullet.y < 0){
      bullets.splice(i,1);
    }else{
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 5, 0,Math.PI * 2);
      ctx.fill();
    }
  }
  requestAnimationFrame(loop);
}
class Bullet{
  constructor(x, y, vx, vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  update(){
    this.x += this.vx;
    this.y += this.vy;
  }
} 

var player = {
  x: 0, 
  y: 0
};
var bullets = []