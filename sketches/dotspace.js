// dotspace - parallax

const dots = [];
const border = 100;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for(let layer = 1; layer <= 3; layer++) {
    for(let i = 0; i < 50; i++) {
      dots.push(new Dot(layer));
    }
  }
}

function draw() {
  background(22, 0, 22, 128);

  for (const dot of dots) {
    dot.draw();
  }
}

class Dot {
  constructor(layer) {
    this.layer = layer;
    this.x = random(-border, width + border);
    this.y = random(-border, height + border);
    
    // colouring
    this.r = random(255);
    this.g = random(0);
    this.b = random(255);

    this.size = random(10, 50);
  }

  draw() {
    let deltaX = 0;
    let deltaY = 0;
    
    if(mouseX != 0 && mouseY != 0){
      deltaX = -this.layer * 
        map(mouseX - width / 2, 0, width, 0, 5);
      deltaY = -this.layer * 
        map(mouseY - height / 2, 0, height, 0, 5);
    }

    this.x += deltaX;
    this.y += deltaY;

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

    // layer 1 is at the back
    if(this.layer === 1) {
      ctx.filter = "blur(2px)";
    } else if(this.layer === 2) {
      ctx.filter = "blur(1px)";
    }
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.size / (4 - this.layer));
    ctx.filter = "none";
  }
}

function windowResized() {
  canvas.resize(windowWidth, windowHeight);
}
