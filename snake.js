function game_func2(){
var canvas = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");
var snake = [];
var celldim = 20;
var xcells = Math.floor(canvas.width/20);
var ycells = Math.floor(canvas.height/20);
var bugx = celldim*(3);
var bugy = celldim*(3);
var dir = 0; //0-right,1-up,2-left,3-down
var addCell = false;
var delta_accepted = false;

document.addEventListener("keydown", keyDownHandler, false);

function keyDownHandler(e) {
    if(!delta_accepted) return;
    if(e.key == "ArrowRight" || e.key == "d") {
        if(dir!=2){ dir = 0; }
    }
    else if(e.key == "ArrowLeft" || e.key == "a") {
        if(dir!=0){ dir = 2; }
    }
    else if(e.key == "ArrowDown" || e.key == "s") {
        if(dir!=1){ dir = 3; }
    }
    else if(e.key == "ArrowUp" || e.key == "w") {
        if(dir!=3){ dir = 1; }
    }
}

function randomInt(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

function drawSnake(){
  ctx.beginPath();
  ctx.strokeStyle = "red";
  for(var i=0; i<snake.length; i++){
    ctx.rect(snake[i].x, snake[i].y, celldim, celldim);
  }
  ctx.stroke();
  ctx.closePath();
}

function initSnake(){
  var startX = celldim;
  var startY = celldim;
  for(var i=0; i<5; i++){
    snake.push({x:startX+celldim*i, y:startY})
  }
}

function moveInX(x){
    if(addCell){
      addCell=false;
    } else {
      snake.shift();
    }
    var final = snake.length-1
    var nw = {x:0, y:snake[final].y}
    if(snake[final].x+x>canvas.width-celldim){
      nw.x = 0;
    }
    else if(snake[final].x+x<0){
      nw.x = canvas.width-celldim;
    }
    else{
      nw.x = snake[final].x + x;
    }
    snake.push(nw);
    delta_accepted = true;
}

function moveInY(y){
  if(addCell){
    addCell=false;
  } else {
    snake.shift();
  }
  var final = snake.length-1
  var nw = {x:snake[final].x,y:0}
  if(snake[final].y+y>canvas.height-celldim){
    nw.y = 0;
  }
  else if(snake[final].y+y<0){
    nw.y = canvas.height-celldim;
  }
  else{
    nw.y = snake[final].y + y;
  }
  snake.push(nw);
  delta_accepted = true;
}

function collision_check(){
  for(var i=0; i<snake.length-1; i++){
    if(snake[i].x == snake[snake.length-1].x && snake[i].y == snake[snake.length-1].y ){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#0095DD";
        ctx.fillText("GAME OVER", (canvas.width/2)-45, canvas.height/2);
        clearInterval(intrvl);
    }
  }
}

function hit_check(){
  if(Math.abs(bugx-snake[snake.length-1].x)<20 && Math.abs(bugy-snake[snake.length-1].y)<20)
  {
    addCell = true;
    var flag = false
    while(!flag){
      bugx = randomInt(0,xcells-1)*celldim;
      bugy = randomInt(0,ycells-1)*celldim;
      for(var i=0; i<snake.length; i++){
        if(bugx == snake[i].x && bugy == snake[i].y){
          break;
        }
        else if (i==snake.length-1) {
          flag=true;
        }
      }
    }
  }
}

function drawBug(){
  ctx.beginPath();
  ctx.fillStyle = "blue";
  ctx.rect(bugx, bugy, celldim, celldim);
  ctx.fill();
  ctx.closePath();
}

function draw(){
  delta_accepted = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBug();
  drawSnake();
  switch(dir) {
    case 0: moveInX(celldim); break;
    case 1: moveInY(-celldim); break;
    case 2: moveInX(-celldim); break;
    case 3: moveInY(celldim); break;
  }
  // requestAnimationFrame(draw);
  collision_check();
  hit_check();
}
initSnake();
intrvl = setInterval(draw, 100);
}
document.getElementById("load2").onclick = game_func2;
