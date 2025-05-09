"use strict";

const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";
const streamText = "the dreamscape. the emptiness in the void below, in the void above. the vast spread of nothing. patterns and curves of noise, waves of sound and silence. the vast space of everything. it is neither a beginning nor an end. it is nowhere. it is everywhere. the call of a million lost voices, the echoes of empty space. it is silence. what is it but a whisper among shadows? a sound that comes from itself. a glow of darkness, a shimmer of thought. see it on the horizon in the distance. in a sea of mirrors, an ocean of glass. step out into an abyss of everything and nothing. space takes form around you. blue and black gives way to stars and worlds. walk the line into the dream. feel. hear. see. through the horizon. step past the accumulation of noise and quiet. walk through the sound and silence. a dream of endless, eternal colours among the stars. are there worlds within worlds within worlds within worlds? does it exist if we can think of it in some reality? or is it just a dream? one that will remain in the scapes of our mind for as long as we think of it. floating on an ocean of colours until it too is claimed by the depths of cessation. submerged. forgotten. and yet. a web of memories unwind, thread by thread. the line, crossed through into the beyond. a world of dreams, of reflections. a world of glass. i have spent my entire life dreaming of becoming something more than what i am now. so many years wasted away with my  head in the clouds. struggling with what my existence means to the world. wishing to have meaning to someone else. i can only wish that maybe one day i can find my way. or maybe that someone else will find me.".replace(/ /g, "");
// const streamText = "░▒▓"
// const streamText = "AAAAAAAAAAHHHHHH!!!!!!AHHHHHHHHHHH!!!!!!!!!";

let avImage;
let startIndex = 0;

function preload() {
  avImage = loadImage("dukemz-batch-gradient-128.png");
}

function setup() {
  createCanvas(800, 800);
  noStroke();
  // fill(255);
  avImage.resize(64, 64)
}

function draw() {
  background(0);
  frameRate(20);
  // image(avImage, 0, 0, width, height);

  let charIndex = startIndex;

  const w = width/avImage.width;
  const h = height/avImage.height;
  avImage.loadPixels();

  for(let j = 0; j < avImage.height; j++) {
    for(let i = 0; i < avImage.width; i++) {
      const pixelIndex = (i + j * avImage.width) * 4;
      const r = avImage.pixels[pixelIndex + 0];
      const g = avImage.pixels[pixelIndex + 1];
      const b = avImage.pixels[pixelIndex + 2];
      // average brightness
      const avg = (r + g + b) / 3;

      const len = density.length;
      // map brightness to density thing
      // const charIndex = floor(map(avg, 0, 255, len, 0));

      textSize(w+5);
      textAlign(CENTER, CENTER);

      fill(r, g, b);
      // stroke(r, g, b);
      // stroke(255)
      // strokeWeight(2)

      // text corresponding to streamText
      text(
        streamText.charAt(charIndex % streamText.length),
        i * w + w * 0.5,
        j * h + h * 0.5
      );
      charIndex++;

      // circle(i * w + w * 0.5, j * h + h * 0.5, w)

      // text corresponding to density brightness
      // text(
      //   density.charAt(charIndex), 
      //   i * w + w * 0.5, 
      //   j * h + h * 0.5
      // )
    }
  }
  startIndex++;
}