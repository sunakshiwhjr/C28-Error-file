class Cannon
{

    constructor(x, y, width, height)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.angle = angle;
       


    }


    display()
    {

        if(keyIsDown(LEFT_ARROW) && this.angle >=-1.580)
        {
            
            this.angle = this.angle - 0.02;
            
        }

        if(keyIsDown(RIGHT_ARROW) && this.angle <=0.31)
        {
            this.angle = this.angle + 0.02;
            console.log(this.angle);
        }
        fill("grey");
        push();
        translate(this.x, this.y);
        rotate(this.angle)
        rect(-10,-20, this.width-10, this.height);
        pop();
        arc(this.x -30, this.y + 90, 160, 240, PI, TWO_PI);

    }
}