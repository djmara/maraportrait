let img;

// CONFIG
let scaleFactor = 2.5;
let depth = 150;
let jitterAmount = 2;
let step = 3; // Skip pixels for speed boost

// ROTATION
let rotX = 0;
let rotY = 0;
let autoRotY = 0;

function preload() {
  img = loadImage('maradona-portrait-2.jpg'); // Upload in web editor's "Assets"
}

function setup() {
  createCanvas(800, 800, WEBGL);
  frameRate(60);
  img.resize(int(width / scaleFactor), int(height / scaleFactor));
  img.loadPixels(); // Needed for get() performance
}

function draw() {
  background(0);
  ambientLight(255);

  // Mouse + auto rotation
  rotX = map(mouseY, 0, height, -PI / 3, PI / 3);
  rotY = map(mouseX, 0, width, -PI / 3, PI / 3);
  let oscillation = sin(frameCount * 0.01) * PI / 8;

  stroke(0, 255, 255);
  strokeWeight(1);
  noFill();

  rotateX(rotX);
  rotateY(rotY + oscillation);
  translate(-img.width * scaleFactor / 2, -img.height * scaleFactor / 2, -depth / 2);

  let t = frameCount * 0.01;

  beginShape(POINTS);
  for (let y = 0; y < img.height; y += step) {
    for (let x = 0; x < img.width; x += step) {
      let c = img.get(x, y);
      let b = brightness(c);
      if (b > 200) continue;

      let z = pow(map(b, 0, 255, 1, 0), 1.5) * depth;
      let jx = map(noise(x * 0.08, y * 0.08, t), 0, 1, -jitterAmount, jitterAmount);
      let jy = map(noise(y * 0.08, x * 0.08, t + 100), 0, 1, -jitterAmount, jitterAmount);
      let jz = map(noise(x * 0.08, y * 0.08, t + 200), 0, 1, -jitterAmount, jitterAmount);

      vertex(x * scaleFactor + jx, y * scaleFactor + jy, -z + jz);
    }
  }
  endShape();
}
