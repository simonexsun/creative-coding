let x = 180
let y = 150

let r = 185
let g = 80
let b = 129

let myName = "Andrew"

function setup() {
  createCanvas(800, 600)
}

function draw() {
  background(r, g, b)
  
  stroke(255, 255, 255)
  fill(0, 0, 255)
  ellipse(x, y, 25, 25)
  
  stroke(255, 0, 255)
  fill(255, 0, 0)
  // rectMode(CENTER)
  rect(0, 100, 50, 25)
  
  stroke(0,0,0);
  line(0, 0, width, height);
  
  fill(255)
  text( myName ,50, 50)
}
