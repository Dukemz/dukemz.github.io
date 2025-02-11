"use strict";
// dotspace - parallax

const dots = [[], [], []]; // array of arrays to store dots by layer
const border = 100; // extra space around the screen for dot spawning

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // generate dots for each layer
  for (let layer = 1; layer <= 3; layer++) {
    for (let i = 0; i < 50; i++) {
      dots[layer - 1].push(new Dot(layer));
    }
  }
}

function draw() {
  background(22, 0, 22, 128); // semi-transparent background
  
  // draw dots layer by layer
  for (let layer = 0; layer < 3; layer++) {
    for (const dot of dots[layer]) {
      dot.update();
    }
    drawLayer(dots[layer], layer + 1);
  }
}

function drawLayer(layerDots, layer) {
  if (layer === 1) {
    drawingContext.filter = "blur(5px)"; // apply blur for first layer
  } else if (layer === 2) {
    drawingContext.filter = "blur(2px)"; // apply less blur for second layer
  }
  
  for (const dot of layerDots) {
    dot.draw();
  }
  
  drawingContext.filter = "none"; // reset filter
}

class Dot {
  constructor(layer) {
    this.layer = layer; // store layer index
    this.x = random(-border, width + border); // initial x position
    this.y = random(-border, height + border); // initial y position
    
    // set random color
    this.r = random(255);
    this.g = random(0);
    this.b = random(255);
    
    this.size = random(10, 50); // random size
  }

  update() {
    let deltaX = 0;
    let deltaY = 0;
    
    // parallax effect based on mouse movement
    if (mouseX !== 0 && mouseY !== 0) {
      deltaX = -this.layer * map(mouseX - width / 2, 0, width, 0, 5);
      deltaY = -this.layer * map(mouseY - height / 2, 0, height, 0, 5);
    }
    
    this.x += deltaX;
    this.y += deltaY;
    
    // wrap dots around the screen if they move out of bounds
    if (this.x < -border) {
      this.x = width + random(border);
      this.y = random(0, height);
    } else if (this.x > width + border) {
      this.x = 0 - random(border);
      this.y = random(0, height);
    }

    if (this.y < -border) {
      this.y = height + random(border);
      this.x = random(0, width);
    } else if (this.y > height + border) {
      this.y = 0 - random(border);
      this.x = random(0, width);
    }
  }

  draw() {
    fill(this.r, this.g, this.b); // set fill color
    circle(this.x, this.y, this.size / (4 - this.layer)); // draw dot
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // adjust canvas size on resize
}
