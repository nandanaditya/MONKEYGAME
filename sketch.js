var PLAY=1;
var END=0;

var monkey , monkey_running,monkey_collided;
var ground,groundImage;

var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var gameState = PLAY;
var gameover,Restart;




function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
 
 obstacleGroup = createGroup() ;
FoodGroup = createGroup();
  
  invisibleGround = createSprite(400,315,900,10);
  invisibleGround.visible = false;
  
  
monkey=createSprite(8,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale=0.1;
  
  ground=createSprite(400,315,900,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  var survivalTime=0;
}


function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  console.log("this is ",gameState)
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
    //scoring
    score = score + Math.round(frameCount/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")&& monkey.y >=100) {
        monkey.velocityY = -13;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //spawn the clouds
    spawnbanana();
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     obstacleGroup.setLifetimeEach(-1);
       FoodGroup.setLifetimeEach(-1);
     obstacleGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
     monkey.changeAnimation("collided",monkey_collided)
     monkey.velocityY = 0;
     
   }
  
 
  //stop monkey from falling down
  monkey.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,310,10,40);
   obstacle.velocityX = -6;
   
   
       obstacle.addImage(obstacleImage);
              
     
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
 }
}

function spawnbanana() {
  //write code here to spawn the banana
   if (frameCount % 60 === 0) {
     banana = createSprite(600,100,40,10);
   banana.y = Math.round(random(10,60));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 134;
    
    //adjust the depth
    banana.depth = banana.depth;
    monkey.depth = monkey.depth + 1;
    
    //adding banana to the group
   FoodGroup.add(banana);
    }
}
