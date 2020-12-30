var bg,bgimage;
var player,playeri,playerr,playerl,dead,deadsound;
var lb,rb,ub,db;
var coinimage,coin,coingroup;
var enemy,enemyimage,enemygroup;
var count=0;
var coinsound,buttons;
var gameState="serve";

function preload(){
  
   bgimage=loadImage("tower.png");
  playeri=loadImage("11.png");
  playerl=loadImage("11left.png");
  playerr=loadImage("11right.png");
  coinimage=loadImage("Coin.png");
  enemyimage=loadImage("enemyBlack1.png")
  coinsound=loadSound("bonusMeterFull.wav")
  buttons=loadSound("buttonClick.wav")
  dead=loadImage("Dead.png");
  deadsound=loadSound("splat.wav")
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  bg=createSprite(windowWidth/2,windowHeight/2,2,2);
  bg.addImage(bgimage);
    bg.scale=windowWidth*windowHeight/160000
  player=createSprite(windowWidth/2,windowHeight/2+50);
  
  lb=createSprite(-5,windowHeight/2,5,windowHeight);
  rb=createSprite(windowWidth+5,200,5,windowHeight);
  ub=createSprite(windowWidth/2,-5,windowWidth,5);
  db=createSprite(windowWidth/2,windowHeight+5,windowWidth,5);
 coingroup=new Group();
  enemygroup=new Group();
}

function draw() {
  background("black");
  
  drawSprites();
  if(gameState==="serve"){
    fill("red")
    textSize(17);
    text("press Space/Touch to start",windowWidth/2-100,windowHeight/2);
    player.visible=false;
    bg.velocityY=0; 
    if(touches.length>0||keyDown("space")){
      gameState="play"
      touches=[];
    }
  }
  if(gameState==="play"){
    coins();
  enemys();
  if(bg.y>windowHeight-140){
    bg.y=40
  }
  bg.velocityY=2+count/3;
    player.visible=true;
  player.addImage(playeri)
  player.scale=bg.scale/11;
  
  player.bounceOff(lb);
  player.bounceOff(rb);
  player.bounceOff(ub);
  player.bounceOff(db);
    
  
  
  player.velocityX=0;
  player.velocityY=0;
    
    if(touches.length<100||keyDown("right")){
    player.velocityX=7+count/5
    player.addImage(playerr)
    buttons.play();
    touches=[];
  }
  
  if(touches.length>0||keyDown("left")){
    player.velocityX=-7-count/5
    player.addImage(playerl)
    buttons.play();
    touches=[];
  }
  if(keyDown("up")){
    player.velocityY=-7-count/5
    buttons.play();
  }
  if(keyDown("down")){
    player.velocityY=7+count/5
    buttons.play();
  }
  
  if(player.isTouching(coingroup)){
    coingroup.destroyEach();
    count=count+1;
    coinsound.play();
  }
    textSize(25)
  fill("red")
  text("coins "+count,10,25)
    if(player.isTouching(enemygroup)){
    gameState="end";
      
  }
    if(gameState==="end"){
      player.addImage(dead)
      bg.velocityY=0;
      player.velocityX=0;
      player.velocityY=0;
      deadsound.play();
      coingroup.destroyEach();
      enemygroup.setVelocityYEach(0);
      
    }
  
  }
  
}
function coins(){
  if(frameCount%50===0){
    coin=createSprite(random(50,550),-2,20,20);
    coin.addImage(coinimage);
    coin.scale=0.025;
    coin.velocityY=bg.velocityY;
    coin.lifetime=coin.velocityY/400
    coingroup.add(coin);
    coin.debug=true;
    coin.setCollider("circle",0,0,500)
  }
}
function enemys(){
    if(frameCount%100===0){
    enemy=createSprite(random(50,550),-2,20,20);
    enemy.addImage(enemyimage);
    enemy.velocityY=bg.velocityY+count/10;
    enemy.lifetime=enemy.velocityY/400;
      enemygroup.add(enemy);
  }
  }