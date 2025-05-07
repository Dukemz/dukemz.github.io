"use strict";

class MatrixSymbol {
  constructor(x, y, speed, size, colour) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.size = size;
    this.setToRandomSymbol();
    this.switchInterval = round(random(2, 20));

    this.colour = colour;
  }

  setToRandomSymbol() {
    this.value = String.fromCharCode(0x30A0 + round(random(0, 96)));
  }

  update() {
    this.y += this.speed;
    if(this.y > height+this.size) this.y = -this.size;

    if(frameCount % this.switchInterval === 0) this.setToRandomSymbol();
  }

  draw() {
    push();
    // fill(50, this.greenValue, 255);
    fill(this.colour);
    textSize(this.size);
    text(this.value, this.x, this.y);
    pop();
  }
}

class MatrixSymbolStream {
  constructor() {
    this.symbols = [];
    this.symbolCount = round(random(5, 30));

    // this.x = width / 2;
    this.x = round(random(0, width));
    this.y = round(random(-700, 0));
    this.speed = round(random(2, 5));
    this.size = 20;

    // colour that will be used for all symbols in stream
    const greenVal = round(random(0, 255));
    this.colour = color(0, greenVal, 255);
    this.colourTransparent = color(0, greenVal, 255, 0);

    this.generate();
  }

  generate() {
    for(let i = 0; i < this.symbolCount; i++) {
      // map 0-symbolCount to 0-1 (or 1-0 so the gradient is in the right direction)
      const opacity = map(i, 0, this.symbolCount, 1, 0);
      const newCol = lerpColor(this.colour, this.colourTransparent, opacity)
      this.symbols.push(new MatrixSymbol(this.x, this.y+(i*this.size), this.speed, this.size, newCol))
    }
  }

  draw() {
    for(let symb of this.symbols) {
      symb.update();
      symb.draw();
    }
  }
}

let streams = [];
let streamCount = 35;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  // test = new MatrixSymbol(width / 2, height / 2);
  // test = new MatrixSymbolStream();
  for(let i = 0; i < streamCount; i++) {
    streams.push(new MatrixSymbolStream());
  }
}

function draw() {
  background(0, 0, 0, 50);
  // ctx.filter = "blur(3px)";
  // test.draw();
  // ctx.filter = "";

  // test.update();
  // test.draw();

  for(let str of streams) {
    str.draw();
  }
}

function windowResized() {
  resizeCanvas(window.innerWidth, window.innerHeight);
  // cba to add proper adaptation, so just reset everything on resize
  streams = [];
  for(let i = 0; i < streamCount; i++) {
    streams.push(new MatrixSymbolStream());
  }
}