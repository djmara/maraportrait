let img;

// CONFIG
let scaleFactor = 2.5;
let depth = 150;
let jitterAmount = 5;
let step = 5;




// ROTATION
let rotX = 0;
let rotY = 0;
let autoRotY = 0;

function preload() {
  img = loadImage('maradona-portrait-2.jpg'); // Upload this in the Assets panel
}

function setup() {
  createCanvas(1920, 1080, WEBGL);
  frameRate(60);
  img.resize(int(width / scaleFactor), int(height / scaleFactor));
  img.loadPixels(); // Load once — now we'll use pixels[] directly
}

function draw() {
  background(0);
  ambientLight(255);

  rotX = map(mouseY, 0, height, -PI / 3, PI / 3);
  rotY = map(mouseX, 0, width, -PI / 3, PI / 3);
  let oscillation = sin(frameCount * 0.01) * PI / 8;

  stroke(0, 255, 255);
  strokeWeight(0.1);
  noFill();

  rotateX(rotX);
  rotateY(rotY + oscillation);
  translate(-img.width * scaleFactor / 2, -img.height * scaleFactor / 2, -depth / 2);

  let t = frameCount * 0.01;

  beginShape(POINTS);
  for (let y = 0; y < img.height; y += step) {
    for (let x = 0; x < img.width; x += step) {
      let i = (x + y * img.width) * 4;
      let r = img.pixels[i];
      let g = img.pixels[i + 1];
      let bVal = img.pixels[i + 2];
      let b = (r + g + bVal) / 3;

     if (b > 150) continue;

      let z = pow(map(b, 0, 255, 1, 0), 5) * depth;
      let jx = map(noise(x * 0.08, y * 0.08, t), 0, 1, -jitterAmount, jitterAmount);
      let jy = map(noise(y * 0.08, x * 0.08, t + 100), 0, 1, -jitterAmount, jitterAmount);
      let jz = map(noise(x * 0.08, y * 0.08, t + 200), 0, 1, -jitterAmount, jitterAmount);

      vertex(x * scaleFactor + jx, y * scaleFactor + jy, -z + jz);
    }
  }
  endShape();
}
