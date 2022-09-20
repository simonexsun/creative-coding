let c1 = { r: 153, g: 192, b: 255}; //blue
let c2 = { r: 153, g: 255, b: 158}; //green
let c3 = { r: 255, g: 185, b: 153}; //orange
let c4 = { r: 185, g: 153, b: 255}; //purple

let color = [c1, c2, c3, c4];

let curvedLine;
let density = 1.5;

let counter = 0;

function setup() {
  createCanvas(700, 300);
  background(0);
  curvedLine = new CurvedLine();
}

function draw() {
  curvedLine.drawLine();
  
  counter ++;
  if (counter >= height/density){
    noLoop();
  }
}

function randomColor(){
  let colorChoice = color[floor(random(0, color.length-1))];
  return colorChoice;
}

class CurvedLine{
  constructor(){
    this.p1 = { x: 0, y: 0 };
    this.p2 = { x: 0, y: 0 };
    this.p3 = { x: 0, y: 0 };
    this.p4 = { x: 0, y: 0 };
  }
  
  randomPos(){
    this.p1.x = random(width);
    this.p1.y = random(height);
    this.p2.x = this.p1.x + random(-height/density,height/density);
    this.p2.y = this.p1.y + random(-height/density,height/density);
    this.p3.x = this.p2.x + random(-height/density,height/density);
    this.p3.y = this.p2.y + random(-height/density,height/density);
    this.p4.x = this.p3.x + random(-height/density,height/density);
    this.p4.y = this.p3.y + random(-height/density,height/density);
  }
  
  drawLine(){
    this.randomPos();
    let color = randomColor();
    noFill();
    stroke(color.r, color.g, color.b);
    curve(this.p1.x, this.p1.y, this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    curve(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p4.x, this.p4.y);
    curve(this.p2.x, this.p2.y, this.p3.x, this.p3.y, this.p4.x, this.p4.y, this.p4.x, this.p4.y);
  }
}


