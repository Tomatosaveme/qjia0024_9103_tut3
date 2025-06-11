let sound;
let animations = [];
const triggers = [
  { time: 2.0, color: [255,50,50] },
  { time: 4.5, color: [50,255,50] },
  { time: 7.2, color: [50,50,255] },
  { time: 9.8, color: [255,255,50] }
];

function preload() {
  sound = loadSound('./bgm/5.m4a');
}

function setup() {
  createCanvas(800, 500);
  createButton('play/stop').position(20, 520)
    .mousePressed(toggleSound);
}

function draw() {
  background(240);
  updateAnimations();
  checkTriggers();
  displayInfo();
}

function toggleSound() {
  sound.isPlaying() ? sound.pause() : sound.play();
}

function checkTriggers() {
  triggers.forEach(t => {
    if (sound.isPlaying() &&
        sound.currentTime() >= t.time &&
        !animations.some(a => a.triggerTime === t.time)) {
      animations.push({
        x: -100,
        y: random(50, height-100),
        color: color(...t.color),
        speed: random(3, 8),
        triggerTime: t.time,
        arrived: false
      });
    }
  });
}

function updateAnimations() {
  animations.forEach(a => {
    if (!a.arrived) {
      a.x += a.speed;
      if (a.x > width-100) a.arrived = true;
    }
    fill(a.color);
    rect(a.x, a.y, 80, 80);
  });
}

function displayInfo() {
  fill(0);
}
)
