const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var myEngine, myWorld;

var tower, ground, cannon, cannonball, boat;

var bgImg, towerImage, boatImg;


var balls = [];
var boats = [];

var boatAnimation = [];
var boatSpriteData, boatSpriteSheet;


var brokenBoatAnimation = [];
var brokenBoatSpriteData, brokenBoatSpriteSheet;

var waterSplashAnimation = [];
var waterSplashSpriteData, waterSplashSpriteSheet;


//boatSpritedata will contain data from JSON
//boatSpritesheet will contain the images.
//sprite sheet basically has animated frames inside single image which save memory and load time in starting a game.

var boatFrames, brokenBoatFrames;

function preload()
{
    bgImg = loadImage("assets/background.gif");
    towerImage = loadImage("./assets/tower.png");
    boatImg = loadImage("assets/boat.png");

    boatSpriteData = loadJSON("assets/boat/boat.json");
    boatSpriteSheet = loadImage("assets/boat/boat.png");

    brokenBoatSpriteData = loadJSON("assets/boat/broken-ship-01.json");
    brokenBoatSpriteSheet = loadImage("assets/boat/broken-ship-01.png");

    waterSplashSpriteData = loadJSON("assets/water_splash/water_splash.json")
    waterSplashSpriteSheet = loadImage("assets/water_splash/water_splash.png")
}

function setup()
{

    createCanvas(1200, 600);
    myEngine = Engine.create();
    myWorld = myEngine.world;

 

    angle = -PI/4;
    tower = new Tower(150, 420, 180, 310)
    ground = new Ground(600, height, width * 2, 1);
 //  ground = new Ground(650, 550, 2000, 20);

    cannon = new Cannon(180, 190, 110, 50, angle);

    cannonball = new CannonBall(cannon.x, cannon.y);

    //boat = new Boat(1300,height - 150,  200, 200);
/*
   var render = Render.create({
        element: document.body,
        engine: myEngine,
        options: {
          width: 1600,
          height: 700,
          wireframes: false
        }
      });
      Render.run(render);
*/
      
     boatFrames = boatSpriteData.frames;

     for(var k=0; k<boatFrames.length; k++)
     {
         var pos1 = boatFrames[k].position;
         //get() in p5 library which helps to fetch a single pixel or a particular portion of the image
         var img1 = boatSpriteSheet.get(pos1.x, pos1.y, pos1.w, pos1.h);
         boatAnimation.push(img1);
     }
     console.log(boatSpriteData);

     brokenBoatFrames = brokenBoatSpriteData.frames;

     for(var l=0; l<brokenBoatFrames.length; l++)
     {

        var pos2 = brokenBoatFrames[l].position;

        var img2 = brokenBoatSpriteSheet.get(pos2.x, pos2.y, pos2.w, pos2.h);
        brokenBoatAnimation.push(img2);
     }

      var waterSplashFrames = waterSplashSpriteData.frames;

      for(var m=0; m<waterSplashFrames; m++)
      {
          var pos3 = waterSplashFrames[m].position;
          var img3 = waterSplashFrames.get(pos3.x, pos3.y, pos3.w, pos3.h);
          waterSplashAnimation.push(img3);
      }


}



function draw()
{
   // alert()
    background("black");
    Engine.update(myEngine);


    //add velocity to the boat
   // Matter.Body.setVelocity(boat.body, {x: -0.9, y:0});

   
    image(bgImg,0, 0, width, height);
    ground.display();

    // boat.display();

    cannonball.display();

   showBoats();
  
console.log("hi", balls.length)
   for(var i = 0; i <balls.length ; i++)
   {
       showCannonBalls(balls[i],i);
     //  console.log("1st " + i + balls[i]);
     console.log("i", i);
       for(var j=0; j<boats.length; j++)
       {
           if(balls[i] !== undefined && boats[j] !== undefined)
           {
              
                var collision = Matter.SAT.collides(balls[i].body, boats[j].body);

                // if two bodies are in contact with one another after a collision occurs. 
                //Matter.js has a module called SAT which detects collisions with Separating Axis Theorem. It's single method can be used to detect if two objects are colliding:
                //Matter.SAT.collides(playerObject, groundObject).collided 
                // returns either true or false depending on if the two objects are colliding
                if(collision.collided)
                {
                    boats[j].remove(j);

                    Matter.World.remove(myWorld, balls[i].body);
                    balls.splice(i,1);
                     i--;
                  

                }
           }
       }
   }


   tower.display();


   cannon.display();
}

function showCannonBalls(cannonball,index)
{
    cannonball.display();
    cannonball.animate();

   
    if(cannonball.body.position.x >=width-100 || cannonball.body.position.y >=height-60)
    {
        if(!cannonball.isSink)
        {

            cannonball.remove(index);
        }
    }
}


function showBoats()
{

    if(boats.length > 0)
    {

        if(boats.length < 4 && boats[boats.length - 1].body.position.x < width -300)
        {
            var position = random([-60, -100, -40, -80]);
            var boat = new Boat(1400, height-120, 200, 200,position, boatAnimation);
           // console.log(boat.body)
            boats.push(boat);
        }

        for(var i = 0;  i<boats.length; i++)
        {
            Matter.Body.setVelocity(boats[i].body,{
                x: -0.9,
                y: 0
            });

            boats[i].display();
            boats[i].animate();
        }
    }
    else{
          var boat = new Boat(1400, height-120, 200, 200, -100, boatAnimation);
         // console.log(boat.body)
          boats.push(boat);
    }
}

function keyPressed()
{
    if(keyCode === DOWN_ARROW)
    {
       
        var cannonball = new CannonBall(cannon.x, cannon.y);
        balls.push(cannonball);
    }
}


function keyReleased()
{
    if(keyCode === DOWN_ARROW)
    {
        //current balls position in array
        balls[balls.length - 1].shoot();
    }
}