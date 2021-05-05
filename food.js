class Food{

    x;
    y;
    w=50; 
    h=50;
    ctx;

    constructor(ctx){
        this.ctx = ctx;
    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    updatePos(canvasW, canvasH, moveSpeed){
        let ranX = Math.floor((Math.random() * canvasW) + 0);
        let ranY = Math.floor((Math.random() * canvasH) + 0);
        this.x = ranX - ranX%moveSpeed;
        this.y = ranY - ranY%moveSpeed;
    }
}