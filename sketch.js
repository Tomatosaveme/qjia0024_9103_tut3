

images = [];
const imgPaths = [
  './images/1.png',
  './images/2.png',
  './images/3.png',
  './images/4.png',
  './images/5.png'
];

function preload() {
  for(let i = 0; i < 5; i++) {
    images[i] = loadImage(imgPaths[i]);
  }
}

function setup() {
  createCanvas(1000, 500);
}

function draw() {
  background(240);

  // align 5 images with same padding
  const imgWidth = 180;
  const spacing = (width - imgWidth * 5) / 6;

  for(let i = 0; i < 5; i++) {
    if(images[i]) {
      const x = spacing * (i + 1) + imgWidth * i;
      image(images[i], x, 150, imgWidth, imgWidth * 0.75);
    }
  }

  // title is here
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text('初始化', width/2, 50);
}



console.log(bass)
