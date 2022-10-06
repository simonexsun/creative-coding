class Leaf {
    constructor(){
        this.d = random(width/10,width/3);
        this.x = random(this.d/2, width-this.d/2);
        this.y = random(this.d/2, height-this.d/2);
        this.start = random(0, 2*PI);
        this.end = this.start + QUARTER_PI;
    }
    
    display(){
        noStroke();
        fill(leafColor);
        s.scribbleEllipse(this.x, this.y, this.d, this.d);
        fill(waterColor);
        arc(this.x, this.y, this.d+5, this.d+5, this.start, this.end);
    }
}