var canvas = document.getElementById("lol");
var ctx = canvas.getContext("2d");
var keys={};
var paused = false;

var images = {
  player : "./hato.jpeg",
  enemy : "./enemy1.png"
}
var imgLoaded = 0;
var imgLoading = 0;
document.onkeydown = function(e){
  keys[e.keyCode] = keys[e.keyCode] ? keys[e.keyCode] + 1 : 1;
};
document.onkeyup = function(e){
  keys[e.keyCode] = 0;
};

Object.keys(images).forEach(function(key){
  imgLoading ++;
  var img = new Image();
  img.onload = function(){
    imgLoaded ++;
    if(imgLoading === imgLoaded){
      loop();
    }
  };
  img.src = images[key];
  images[key] = img;
})

var frames = 0;

function loop(){
  if(paused){
    requestAnimationFrame(loop);
    return;
  }
  if(keys[37]){
    player.x -= 10;
  }
  if(keys[39]){
    player.x += 10;
  }
  if(keys[38]){
    player.y -= 10;
  }
  if(keys[40]){
    player.y += 10;
  }
  if(keys[32] === 1){
    bullets.push(new Bullet(player.x, player.y, 0, -10));
    keys[32] ++;
  }
  
  
  
  ctx.clearRect(0, 0, 600, 400);
  ctx.save();
  ctx.translate(player.x, player.y);
  ctx.drawImage(images.player, -25, -25, 50, 50);
  ctx.restore();
  ctx.fillStyle = "#FFF";
  
  frames ++;
  if(frames % 60 === 0){
    enemies.push(new Enemy(Math.random() * (600 - images.enemy.width) , -images.enemy.height, 0, 3));
  }
  
  for(var i = enemies.length - 1; i>=0; i --){
    var enemy = enemies[i];
    enemy.update();
    //delete enemies outsided
    if(enemy.y > 400){
      enemies.splice(i,1);
    }else{
      ctx.drawImage(images.enemy, enemy.x, enemy.y);
    }
  }
  for(var i = bullets.length - 1;i>=0; i --){
    var bullet = bullets[i];
    bullet.update();
    if(bullet.y < 0){
      bullets.splice(i,1);
    }else{
      for(var o = enemies.length - 1; o>=0; o --){
//        えねみー
        var enemy = enemies[o];
        if(bullet.x >= enemy.x && bullet.x <= enemy.x + images.enemy.width && bullet.y >= enemy.y && bullet.y <= enemy.y + images.enemy.height){
          enemies.splice(o,1);
          bullets.splice(i,1);
          break;
        }
      }
      
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, 3.5, 0,Math.PI * 2);
      ctx.fill();
    }
  }
  requestAnimationFrame(loop);
}
class Sprite{
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
class Bullet extends Sprite{
  constructor(x, y, vx, vy){
    super(x, y, vx, vy);
  }
}

class Enemy extends Sprite{
  constructor(x, y, vx, vy){
    super(x, y, vx, vy);
  }
}

var player = {
  x: 0, 
  y: 0
};
var enemies = [];
var bullets = [];