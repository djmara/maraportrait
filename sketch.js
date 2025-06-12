let img;

// CONFIG
let scaleFactor = 2.5;
let depth = 150;
let jitterAmount = 2;

// ROTATION
let rotX = 0;
let rotY = 0;
let autoRotY = 0;

function preload() {
  img = loadImage('maradona-portrait-2.jpg'); // Upload in editor's "Assets"
}

function setup() {
  createCanvas(1920, 1080, WEBGL); // You can increase resolution if needed
  img.resize(int(width / scaleFactor), int(height / scaleFactor));
  img.filter(GRAY);
  frameRate(60);
}

function draw() {
  background(0);
  ambientLight(255);

  // Mouse-controlled rotation + auto oscillation
  rotX = map(mouseY, 0, height, -PI / 3, PI / 3);
  rotY = map(mouseX, 0, width, -PI / 3, PI / 3);
  let oscillation = sin(frameCount * 0.01) * PI / 8;

  stroke(0, 255, 255);
  strokeWeight(1.2);
  noFill();

  rotateX(rotX);
  rotateY(rotY + oscillation);
  translate(-img.width * scaleFactor / 2, -img.height * scaleFactor / 2, -depth / 2);

  let t = frameCount * 0.01;

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let c = img.get(x, y);
      let b = brightness(c);
      if (b > 200) continue;

      let z = pow(map(b, 0, 255, 1, 0), 1.5) * depth;
      let jx = map(noise(x * 0.08, y * 0.08, t), 0, 1, -jitterAmount, jitterAmount);
      let jy = map(noise(y * 0.08, x * 0.08, t + 100), 0, 1, -jitterAmount, jitterAmount);
      let jz = map(noise(x * 0.08, y * 0.08, t + 200), 0, 1, -jitterAmount, jitterAmount);

      push();
      translate(x * scaleFactor + jx, y * scaleFactor + jy, -z + jz);
      point(0, 0, 0);
      pop();
    }
  }
}
