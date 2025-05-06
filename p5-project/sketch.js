let img;
let numSegments=50;
let segments=[];
let drawSegments=false;
let imgDrawProps ={aspect:0,height:0,xOffset:0,yOffset:0};
let canvasAspectRatio=0;
function preload(){
  img=loadImage('assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup(){
  createCanvas(windowsWidth,windowHeight);
  imgDrawProps.aspect=img.width/img.height;
  canvasAspectRatio=width/height;
  calculateImageDrawProps();
}

function draw(){
  background(220)
  image(img,imgDrawProps.xOffset, imgDrawProps.yOffset,imgDrawProps.width,imgDrawProps.height);
}

function windowResized(){
  resizeCanvas(windowWidth,windowHeight);
  calculateImageDrawProps();
}

function calculateImageDrawProps(){
  if(imgDrawProps.aspect>canvasAspectRatio){
    imgDrawProps.width=width;
    imgDrawProps.height=width/imgDrawProps.aspect;
    imgDrawProps.yOffset=(height-imgDrawProps.height)/2;
    imgDrawProps.xOffset=0;
  }else if (imgDrawProps.aspect<canvasAspectRatio) {
    imgDrawProps.height=height;
    imgDrawProps.width=height*imgDrawProps.aspect;
    imgDrawProps.xOffset=(width-imgDrawProps.width)/2;
    imgDrawProps.yOffset=0;
  } else if (imgDrawProps.aspect==canvasAspectRatio){
    imgDrawProps.width=width;
    imgDrawProps.height=height;
    imgDrawProps.xOffset=(width-imgDrawProps.width)/2;
    imgDrawProps.yOffset=0;
  }
}


function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
