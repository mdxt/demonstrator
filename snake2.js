function s2(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var snake = [];
var celldim = 20;
var xcells = Math.floor(canvas.width/20);
var ycells = Math.floor(canvas.height/20);
var bugx = celldim*(3);
var bugy = celldim*(3);
var gdir = 0; //0-right,1-up,2-left,3-down
var lengthen = false;
var delta = false;
var interval = false;

document.addEventListener("keydown", keyDownHandler1, false);

function keyDownHandler1(e) {
    if(interval) return;
    if(e.key == "ArrowRight" || e.key == "d") {
        if(gdir!=2){ gdir = 0; delta = true;}
    }
    else if(e.key == "ArrowLeft" || e.key == "a") {
        if(gdir!=0){ gdir = 2; delta = true;}
    }
    else if(e.key == "ArrowDown" || e.key == "s") {
        if(gdir!=1){ gdir = 3; delta = true;}
    }
    else if(e.key == "ArrowUp" || e.key == "w") {
        if(gdir!=3){ gdir = 1; delta = true;}
    }
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function drawSnake(){
  ctx.beginPath();
  ctx.fillStyle = "red";
  for(var i=0; i<snake.length-1; i++){
    // if(snake[i].borderCell == true){
    //   ctx.rect(snake[i].x, snake[i].y, celldim, celldim);
    //   continue;
    // }
    // if(snake[i].x!=snake[i+1].x){
    //   var rect_width = Math.abs(snake[i].x-snake[i+1].x);
    //   ctx.rect(Math.min(snake[i].x, snake[i+1].x), snake[i].y, rect_width, celldim);
    //   continue;
    // }
    // if(snake[i].y!=snake[i+1].y){
    //   var rect_height = Math.abs(snake[i].y-snake[i+1].y);
    //   ctx.rect(snake[i].x, Math.min(snake[i].y, snake[i+1].y), celldim, rect_height);
    //   continue;
    // }
    if(snake[i].borderCell == true){
      ctx.rect(snake[i].x, snake[i].y, celldim, celldim);
      continue;
    }
    if(snake[i].dir==0){
      var rect_width = snake[i+1].x-snake[i].x;
      ctx.rect(snake[i].x, snake[i].y, rect_width, celldim);
      continue;
    }
    if(snake[i].dir==1){
      var rect_height = snake[i].y-snake[i+1].y;
      ctx.rect(snake[i+1].x, snake[i+1].y, celldim, rect_height);
      continue;
    }
    if(snake[i].dir==2){
      var rect_width = snake[i].x-snake[i+1].x;
      ctx.rect(snake[i+1].x, snake[i+1].y, rect_width, celldim);
      continue;
    }
    if(snake[i].dir==3){
      var rect_height = snake[i+1].y-snake[i].y;
      ctx.rect(snake[i].x, snake[i].y, celldim, rect_height);
      continue;
    }
  }
  // if(snake[snake.length-2].dir==snake[snake.length-1].dir){
  //   ctx.rect(snake[snake.length-2].x, snake[snake.length-2].y, celldim, celldim);
  // }
  ctx.rect(snake[snake.length-1].x, snake[snake.length-1].y, celldim, celldim);
  ctx.fill();
  // ctx.fillStyle = "red";
  ctx.fillText("x0-"+snake[0].x+",x1-"+snake[snake.length-1].x+",length-"+snake.length, 50, 50);
  ctx.closePath();
}

function initSnake(){
    startX = celldim*2;
    startY = celldim*3;
    snake.push({x:startX, y:startY, dir:gdir, borderCell:false});
    snake.push({x:startX+celldim, y:startY, dir:gdir, borderCell:false});
}

function collision_check(){
  for(var i=0; i<snake.length-2; i++){
    if(snake[i].borderCell == true){
      continue;
    }
    if(snake[i].x == snake[snake.length-1].x){
        var less_i = (snake[snake.length-1].y <= snake[i].y);
        var less_in = (snake[snake.length-1].y <= snake[i+1].y);
        if((less_i && less_in) || !(less_i || less_in)){
          break;
        }
        alert("GAME OVER");
        clearInterval(intrvl);
    }
    if(snake[i].y == snake[snake.length-1].y){
        var less_i = (snake[snake.length-1].x <= snake[i].x);
        var less_in = (snake[snake.length-1].x <= snake[i+1].x);
        if((less_i && less_in) || !(less_i || less_in)){
          break;
        }
        alert("GAME OVER");
        clearInterval(intrvl);
    }
  }
}

function hit_check(){
  if(Math.abs(bugx-snake[snake.length-1].x)<20 && Math.abs(bugy-snake[snake.length-1].y)<20)
  {
    lengthen = true;
    bugx = randomInt(0,xcells-1)*celldim;
    bugy = randomInt(0,ycells-1)*celldim;
  }
}

function drawBug(){
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.rect(bugx, bugy, celldim, celldim);
  ctx.fill();
  ctx.closePath();
}

function moveRight(){
  if(snake[snake.length-1].x+2*celldim>canvas.width){
    snake[snake.length-1].borderCell = true;
    snake.push({x:0,y:snake[snake.length-1].y,dir:-1,borderCell:false});
    snake.push({x:0,y:snake[snake.length-1].y,dir:0,borderCell:false});
    delta = false;
  } else if (delta) {
    snake[snake.length-2].dir = snake[snake.length-1].dir;
    snake[snake.length-1].dir = 0;
    snake.push({x:snake[snake.length-1].x+celldim,y:snake[snake.length-1].y,dir:0,borderCell:false});
  }
  else{
      snake[snake.length-2].dir = snake[snake.length-1].dir;
      snake[snake.length-1].x += celldim;
  }
  moveTail();
}

function moveLeft(){
  if(snake[snake.length-1].x-celldim<0){
    snake[snake.length-1].borderCell = true;
    snake.push({x:canvas.width-celldim,y:snake[snake.length-1].y,dir:-1,borderCell:false});
    snake.push({x:canvas.width-celldim,y:snake[snake.length-1].y,dir:2,borderCell:false});
    delta = false;
  } else if (delta) {
    snake[snake.length-2].dir = snake[snake.length-1].dir;
    snake[snake.length-1].dir = 2;
    snake.push({x:snake[snake.length-1].x-celldim,y:snake[snake.length-1].y,dir:2,borderCell:false});
  }
  else{
      snake[snake.length-2].dir = snake[snake.length-1].dir;
      snake[snake.length-1].x -= celldim;
  }
  moveTail();
}

function moveUp(){
  if(snake[snake.length-1].y-celldim<0){
    snake[snake.length-1].borderCell = true;
    snake.push({x:snake[snake.length-1].x,y:canvas.width-celldim,dir:-1,borderCell:false});
    snake.push({x:snake[snake.length-1].x,y:canvas.width-celldim,dir:1,borderCell:false});
    delta = false;
  } else if (delta) {
    snake[snake.length-2].dir = snake[snake.length-1].dir;
    snake[snake.length-1].dir = 1;
    snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y-celldim,dir:1,borderCell:false});
  }
  else{
      snake[snake.length-2].dir = snake[snake.length-1].dir;
      snake[snake.length-1].y -= celldim;
  }
  moveTail();
}

function moveDown(){
  if(snake[snake.length-1].y+2*celldim>canvas.height){
    snake[snake.length-1].borderCell = true;
    snake.push({x:snake[snake.length-1].x,y:0,dir:-1,borderCell:false});
    snake.push({x:snake[snake.length-1].x,y:0,dir:3,borderCell:false});
    delta = false;
  } else if (delta) {
    snake[snake.length-2].dir = snake[snake.length-1].dir;
    snake[snake.length-1].dir = 3;
    snake.push({x:snake[snake.length-1].x,y:snake[snake.length-1].y+celldim,dir:3,borderCell:false});
  }
  else{
      snake[snake.length-2].dir = snake[snake.length-1].dir;
      snake[snake.length-1].y += celldim;
  }
  moveTail();
}

function moveTail(){
  if(lengthen){
    lengthen=false;
    return;
  }
  if(snake[0].borderCell == true){
    snake.shift();
    return;
  }
  switch (snake[0].dir) {
    case 0: snake[0].x += celldim; break;
    case 1: snake[0].y -= celldim; break;
    case 2: snake[0].x -= celldim; break;
    case 3: snake[0].y += celldim; break;
  }
  if(snake[0].x == snake[1].x && snake[0].y == snake[1].y){
    snake.shift();
  }
}

function draw(){
  interval = true;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBug();
  drawSnake();
  switch(gdir) {
    case 0: moveRight(); break;
    case 1: moveUp(); break;
    case 2: moveLeft(); break;
    case 3: moveDown(); break;
  }
  hit_check();
  collision_check();
  interval = false;
}
initSnake();
//drawSnake();
intrvl = setInterval(draw, 100);
}
s2();
