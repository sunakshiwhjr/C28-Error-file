class Tower
{

    constructor(x,y, width, height)
    {
        var options = {

            isStatic: true
        }
        this.width = width;
        this.height = height;
        this.image = loadImage("assets/tower.png")
        this.body = Bodies.rectangle(x, y, this.width, this.height, options);
        
        World.add(myWorld, this.body);
        
    }

    display()
    {

        var pos = this.body.position;
        push();
        imageMode(CENTER);
        image(this.image, pos.x, pos.y, this.width, this.height);
        pop();
    }
}