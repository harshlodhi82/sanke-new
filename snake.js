class Snake{

    x = 50;y= 50;ctx;tails = [];tailLength = 0;
    w=50;h=50;

    constructor(ctx){
        this.ctx = ctx;
    }

    draw(){
        ctx.fillStyle = "orange";
        ctx.fillRect(this.x, this.y, this.w, this.h);
        for (let i = 0; i < this.tails.length; i++) {
            const tail = this.tails[i];
            ctx.fillRect(tail.x, tail.y, this.w, this.h);
        }
    }

}