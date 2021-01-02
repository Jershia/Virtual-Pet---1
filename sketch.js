//Create variables here
var dog,dogImage;
var happyDog,happyDogImage;
var database;
var foodS = 25;
var foodStock ;

function preload()
{
  //load images here
  dogImage = loadImage("dogImg.png");
  happydogImage = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(300,250,10,10);
  dog.addImage(dogImage)
  dog.scale = 0.3;
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  //add styles here

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happydogImage);
  }
  drawSprites();
  fill("white");
  textSize(20);
  text("Press Up Arrow Key To Feed Johny",70,50);
  textSize(20);
  fill("white");
  text("Food : " + foodS,200,450);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  }
  )
}




