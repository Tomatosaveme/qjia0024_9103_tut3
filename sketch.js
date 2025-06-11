“let instrumentImages = [];
const imgPaths = [
  './images/1.png', // bass
  './images/2.png', // drums
  './images/3.png', // metronome
  './images/4.png', // other
  './images/5.png'  // vocals
];

let sounds = [];
const soundPaths = [
  './bgm/bass.mp3',
  './bgm/drums.mp3',
  './bgm/metronome.mp3',
  './bgm/other.mp3',
  './bgm/vocals.mp3'
];

let notes = [];
const tracks = [bass, drums, metronome, other, vocals];

function preload() {

  for (let i = 0; i < imgPaths.length; i++) {
    instrumentImages[i] = loadImage(imgPaths[i]);
  }


  for (let i = 0; i < soundPaths.length; i++) {
    sounds[i] = loadSound(soundPaths[i]);
  }
}

function setup() {
  createCanvas(1000, 500);
  let button = createButton("Play All Tracks");
  button.mousePressed(() => {
    for (let s of sounds) {
      if (!s.isPlaying()) {
        s.play();
      }
    }
  });
}

function draw() {
  background(240);

  const imgWidth = 180;
  const spacing = (width - imgWidth * 5) / 6;
  const y = 150;
  const imgHeight = imgWidth * 0.75;


  let currentSec = floor(sounds[0].currentTime());

  // 每秒生成对应的音符方块
  if (frameCount % 60 === 0) {
    for (let i = 0; i < tracks.length; i++) {
      const track = tracks[i];
      const obj = track.find(d => d.second === currentSec);
      if (obj && obj.size > 0) {
        for (let j = 0; j < obj.size; j++) {
          const x = spacing * (i + 1) + imgWidth * i - 30 - j * 25;
          const yBlock = y + i * (imgHeight + 20) + 20;
          notes.push({ x, y: yBlock, life: 255 });
        }
      }
    }
  }

  // show the image
  for (let i = 0; i < 5; i++) {
    if (instrumentImages[i]) {
      const x = spacing * (i + 1) + imgWidth * i;
      const yPos = y + i * (imgHeight + 20);
      image(instrumentImages[i], x, yPos, imgWidth, imgHeight);
    }
  }


  for (let note of notes) {
    fill(255, 0, 0, note.life);
    noStroke();
    rect(note.x, note.y, 20, 20);
    note.life -= 2;
  }


  notes = notes.filter(note => note.life > 0);

  textSize(24);
  fill(0);
  textAlign(CENTER);
  text('play music', width / 2, 50);
}
