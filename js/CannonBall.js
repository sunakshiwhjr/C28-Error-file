class CannonBall
{

    constructor(x,y)
    {
        var options = {

           
            friction:1,
            density:1,
            restitution:0.8,
            isStatic: true,

        }
        this.r = 40;
        this.speed = 0.05;
        this.body = Bodies.circle(x, y, this.r, options);
        this.cannonBall = loadImage("assets/cannonball.png");
        this.animation = [this.cannonBall];
        this.image = loadImage("./assets/cannonball.png");
        this.trajectory = [];
        this.isSink = false;
        World.add(myWorld, this.body);
        
    }

    animate()
    {
        this.speed += 0.05 % 1.1;
    }
    shoot()
    {
        var velocity = p5.Vector.fromAngle(cannon.angle);
        velocity.mult(20);
        Matter.Body.setStatic(this.body, false);
        Matter.Body.setVelocity(this.body, { x: velocity.x, y: velocity.y });
    }

    remove(index)
    {
        this.isSink = true;
        Matter.Body.setVelocity(this.body, {x:0, y:0});

        this.animation = waterSplashAnimation;
        this.speed = 0.05;
        this.r = 150;

        setTimeout(() =>{
            Matter.World.remove(myWorld, this.body);
            balls.splice(index,1);

        }, 1000);
    }

    display()
    {
        var angle = this.body.angle;
        var pos = this.body.position;
        var index1 = floor(this.speed% this.animation.length);

        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.animation[index1],0,0, this.r, this.r);
        pop();

  if(this.body.velocity.x > 0 && this.body.position.x > 180)
        {
            var position = [this.body.position.x, this.body.position.y];
            this.trajectory.push(position);
        }


        for(var i=0; i<this.trajectory.length; i++)
        {
            image(this.image, this.trajectory[i][0], this.trajectory[i][1], 5, 5)
        }
    }

}
