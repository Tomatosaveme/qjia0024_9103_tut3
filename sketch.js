let numKeys = 14; // Number of piano keys
let s; // scale factor for responsiveness
let isMusicLoaded = false;// Declare a boolean variable to track whether the music has been successfully loaded.
let verticalShapes = [];//store squares that emit from bottom to up
let squares = [];//store squares that emit from let to right
let bgColors = ["#FFCCCB", "#D3D3D3", "#ADD8E6", "#FFFF99"];
let bgColorIndex = 0;
let lastBgChangeTime = 0;
let isPlaying = false;
let sound;

/**
 *  Preload the music file before the sketch starts.
 * The preload() function ensures that the audio is fully loaded
 * before `setup()` and `draw()` are executed.
 */
function preload() {
  try { /**The following lines were taken from ChatGPT.
     * Attempt to load the audio file using loadSound().
     * The file path points to a local asset in the 'assets' folder.
     * loadSound() takes three parameters:
     * - The file path
     * - A success callback (executed if loading is successful)
     * - An error callback (executed if loading fails)
     */

      sound = loadSound('assets/Chick Corea、Return To Forever - Spain (1) (mp3cut.net).mp3',// Use loadSound() to load an audio file from the specified path.
        () => {
          console.log('music load sucess');
          isMusicLoaded = true;// If the sound loads successfully, log a success message and set isMusicLoaded to true.
        },// Error callback
        (err) => {
          console.error('music load failed:', err);// If the sound fails to load, log an error message with details.
        }
      );
    } catch (error) {
      console.error('loading error:', error); /**Catch any unexpected errors outside of loadSound callbacks.
      * This is useful for catching exceptions not related to file access,
      * such as syntax or execution errors.
      */
  }
}
/**
 * This function runs once at the beginning of the program.
 * It sets up the canvas and attaches interaction logic for music playback.
 */
function setup() {
  createCanvas(windowWidth, windowHeight);
  s = windowWidth / 1920;

  // Get the progress bar element from the HTML to sync audio progress
  let animationProgress = document.getElementById('animationProgress');

    /**
   * Attach an event listener to the "Play" button.
   * If the music is loaded and not already playing, start the music,
   * lower the volume to a moderate level (0.5), and update the state.
   */
  document.getElementById('playButton').addEventListener('click', () => {
    if (isMusicLoaded && !sound.isPlaying()) {
      sound.play();
      sound.setVolume(0.5);
      isPlaying = true;
    }
  });

  /**
   *Attach an event listener to the "Pause" button.
   * If the music is loaded and currently playing, pause the playback
   * and update the state.
   */
  document.getElementById('pauseButton').addEventListener('click', () => {
    if (isMusicLoaded && sound.isPlaying()) {
      sound.pause();
      isPlaying = false;
    }
  });

  // Add an event listener to the progress bar to handle user input
  animationProgress.addEventListener('input', () => {
    // If music is loaded, jump to the selected time in the track
    if (isMusicLoaded) {
      sound.jump(animationProgress.value);
    }
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  s = windowWidth / 1920;
}



function draw() {
  background(220);
  /**
 * Update the audio progress slider based on current sound time.
 * This lets the user see how far the music has played in real time.
 */

  // Update the progress bar value in real time
  let animationProgress = document.getElementById('animationProgress');
  // Set the slider value to current time of the sound
  if (isMusicLoaded && sound.isPlaying()) {
    animationProgress.value = sound.currentTime();
  }
  /**
 * Emit horizontal squares every 30 frames while the music is playing.
 * These squares appear from the left and move to the right.
 */

  if (isMusicLoaded && sound.isPlaying() && frameCount % 30 === 0) {  // Every 30 frames, emit a square from the left side with a random color
    let colors = [color(255, 0, 0), color(255, 255, 0), color(0, 0, 255), color(128, 128, 128)];
    let randomColor = colors[floor(random(colors.length))];
    squares.push({ x: 0, y: random(height), size: 30, color: randomColor });//the squares starts from the left of the screen(x=0),the information of the squares
    //are stored in squares[]
  }

  /**
 *Animate all horizontal squares and remove them when they go off-screen.
 */

  // Loop through all squares and move them to the right
  for (let i = squares.length - 1; i >= 0; i--) {
    // Loop through the squares array from the end to the beginning.
  // This reverse loop helps safely remove items from the array without skipping any.
    let sq = squares[i]; // // Get the current square object from the array.
    fill(sq.color);// Set the fill color to the square's specified color.
    noStroke();// Disable outline stroke so only the filled square is visible.
    rect(sq.x, sq.y, sq.size, sq.size);// Draw the square at position (x, y) with the specified size.
    sq.x += 5; // Then moves the square 5 pixels to the right (sq.x += 5).

    if (sq.x > width) {
      squares.splice(i, 1); // If a square moves off the canvas (x > width), it gets removed from the array.
    }
  }
  /**
 * Emit vertical shapes every 60 frames — one rectangle and one square.
 * These shapes rise from the bottom and simulate another visual rhythm.
 */

  // Every 60 frames, emit one yellow rectangle and one gray square from the bottom
  if (isMusicLoaded && sound.isPlaying() && frameCount % 60 === 0) {// set squares
    verticalShapes.push({ type: 'rect', x: random(width - 50), y: height, width: 80, height: 40, color: color(255, 255, 0) });
    verticalShapes.push({ type: 'square', x: random(width - 50), y: height, size: 50, color: color(128, 128, 128) });
  }

  /**
 * Animate all vertical shapes upward and remove them if they go off-screen.
 */
  // Loop through all vertical shapes and move them upward
  for (let i = verticalShapes.length - 1; i >= 0; i--) {
    // Loop through the verticalShapes array from the last element to the first.
  // This reverse order allows us to safely remove elements without skipping any.
    let shape = verticalShapes[i]; // Get the current shape object from the array.
    fill(shape.color);
    noStroke();
    if (shape.type === 'rect') {
      // If the shape is a rectangle, draw it using its width and height.
      rect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === 'square') {
       // If the shape is a square, draw it using size for both width and height.
      rect(shape.x, shape.y, shape.size, shape.size);
    }
    shape.y -= 3;  // Move the shape upward by decreasing its y position by 3 pixels.


    if (shape.y < -100) { // If the shape has moved off the top of the canvas (above -100), remove it.
      verticalShapes.splice(i, 1);
    }
  }

  /**
 *After 15 seconds of playback, change background color every 1.2 seconds.
 * This gives the visual design a more dynamic, time-reactive quality.
 */

  // When music is loaded, playing, and has reached 15 seconds
  if (sound.currentTime() >= 15 && millis() - lastBgChangeTime > 1200) {
    // Check if the music has been playing for at least 15 seconds
    // and if at least 1200 milliseconds (1.2 seconds) have passed since the last background color change.

    background(bgColors[bgColorIndex]);
    // Set the background color to the current color in the bgColors array using the current index.
    bgColorIndex = (bgColorIndex + 1) % bgColors.length;
    // Move to the next color in the array. Use modulo to loop back to the start when reaching the end.
    // Update the last background change time to the current time so the next change happens after 1.2 seconds.
    lastBgChangeTime = millis();
  }


 /**
 * draw: draw the image
 */


  // trumpet 1
  push();
  // Save the current drawing style and transformation settings.
  // This ensures that any transformations inside this block don't affect the rest of the canvas.
  translate(0, -30 * s);
  // Move the origin upwards by 30 times the scale factor `s`.
  // This positions the trumpet visually on the canvas.
  scale(s);// Apply a scaling transformation to make the trumpet size responsive to screen width.
  drawTrumpet();// Call the function to draw the trumpet shape at the translated and scaled position.

  pop();// Restore the previous drawing settings and transformations (undo push/translate/scale).

  // trumpet 2
  push();
  translate(0, 150 * s);
  scale(s);
  drawTrumpet();
  pop();

  // guitar
  push();
  translate(0, -30 * s);
  scale(s);
  drawGuitar();
  pop();

  // violin
  push();
  translate(0, -30 * s);
  scale(s);
  drawViolin();
  pop();

  // drum
  push();
  translate(225 * s, -30 * s);
  scale(s);
  drawDrum();
  pop();

  // trumpet 3
  push();
  translate(225 * s, -30 * s);
  scale(s);
  drawTrumpet3();
  pop();

  // trumpet 4
  push();
  translate(225 * s, -30 * s);
  scale(s);
  drawTrumpet4();
  pop();
  /**
 *Draw interactive piano keys at the bottom of the screen.
 * We divide the canvas width into `numKeys` equal parts, and draw
 * each as a piano key.
 */

  // Piano keys
  let w = width / numKeys; // Width of each key
  let pianoY = height * 0.9;// Y-position where keys start (near bottom of screen)
  for (let i = 0; i < numKeys; i++) {
    let x = i * w; // X-position of the current key
    /**
   *Check if the mouse is hovering over this key.
   * If it is, highlight the key with a different fill color.
   */
    if (mouseX > x && mouseX < x + w && mouseY > pianoY && mouseY < height) {
      fill(355, 10, 90);  // Use a vibrant pinkish-red color when the key is hovered over.
    } else {
      fill(255); // Use white as the default color when not hovered.
    }
   /**
   *Draw the key using a rectangle with a black stroke.
   * Keys are drawn side by side to form a horizontal piano.
   */
    stroke(0);// Set outline color to black.
    strokeWeight(1);// Set outline thickness to 1 pixel.
    rect(x, pianoY, w - 1, height - pianoY - 1);
    // Draw the key at (x, pianoY) with calculated width and height.
    // Subtracting 1 pixel ensures a clear boundary between keys.
  }
}




function drawTrumpet() {
  stroke(0); // Set the stroke (outline) color to black
  strokeWeight(1);// Set the thickness of the outline to 1 pixel.
  fill(0, 0, 255);// Set the fill color to blue using RGB (Red: 0, Green: 0, Blue: 255).
  beginShape()// Start defining a custom shape using vertices.
  vertex(0, 111); // Add the first vertex point at coordinates (0, 111).
  vertex(65,111); // Add a point at (65, 111), creating a horizontal line segment.
  vertex(65, 105);// Add a point at (65, 105), forming a vertical line downward.
  vertex(69, 105);//...
  vertex(69, 88);
  vertex(74, 88);
  vertex(74, 105);
  vertex(78, 105);
  vertex(78, 110);
  vertex(84, 110);
  vertex(85, 106);
  vertex(88, 106);
  vertex(88, 93);
  vertex(92, 93);
  vertex(92, 106);
  vertex(96, 107);
  vertex(96, 110);
  vertex(104, 111);
  vertex(104, 107);
  vertex(108, 107);
  vertex(108, 88);
  vertex(113, 88);
  vertex(112, 107);
  vertex(115, 107);
  vertex(115,111);
  vertex(198, 111);
  bezierVertex(207,110, 218, 108, 229, 102);
  bezierVertex(238, 96, 243, 90, 249, 84);
  bezierVertex(255, 77, 259, 68, 259, 68);
  vertex(259, 68);
  vertex(254, 186);
  bezierVertex(254, 186, 253, 180, 251, 176);
  bezierVertex(250, 174,247, 166, 240, 157);
  bezierVertex(235, 150, 230, 144, 222, 139);
  bezierVertex(211, 132, 200, 131, 193, 131);
  vertex(193, 131);
  vertex(157, 130);

  bezierVertex(158, 132, 161, 135, 163, 140);
  bezierVertex(165, 146, 163, 152, 163, 155);
  bezierVertex(162, 156, 160, 163, 154, 168);
  bezierVertex(149, 172, 145, 173, 143, 173);
  vertex(136, 174);
  vertex(0, 170);
  vertex(0, 159);
  vertex(65, 160);
  vertex(65, 130);
  vertex(77, 130);
  vertex(77, 160);
  vertex(83, 160);
  vertex(83, 130);
  vertex(95, 130);
  vertex(95, 160);
  vertex(103, 160);
  vertex(104, 130);
  vertex(115, 130);
  vertex(114, 162);
  vertex(140, 162);
  bezierVertex(141, 162, 142, 162, 144, 161);
  bezierVertex(145, 160, 148, 159, 150, 156);
  bezierVertex(151, 155, 152, 154, 153, 152);
  bezierVertex(154, 148, 152, 143, 152, 143);
  bezierVertex(152, 143, 151, 137, 146, 135);
  bezierVertex(144, 133, 142, 133, 141, 133);
  vertex(141, 133);
  vertex(115, 132);
  vertex(0, 129);
  endShape(CLOSE);
}

function drawGuitar() {
  stroke(0);
  strokeWeight(1);
  fill(255, 0, 0);
  beginShape();
  vertex(0, 503);
  bezierVertex(1, 503, 3, 504, 5, 504);
  bezierVertex(7, 504, 11, 505, 15, 504);
  bezierVertex(18, 504, 20, 503, 25, 502);
  bezierVertex(29, 500, 30, 500, 36, 498);
  bezierVertex(39, 497, 42, 496, 45, 495);
  bezierVertex(48, 494, 52, 493, 56, 492);
  bezierVertex(61, 492, 66, 491, 73, 493);
  bezierVertex(78, 494, 81, 495, 82, 496);
  bezierVertex(83, 497, 86, 499, 87, 501);
  bezierVertex(89, 504, 89, 507, 89, 508);
  bezierVertex(89, 509, 90, 511, 88, 513);
  bezierVertex(87, 514, 86, 514, 85, 514);
  bezierVertex(82, 515, 81, 515, 79, 515);
  bezierVertex(75, 515, 71, 516, 70, 516);
  bezierVertex(68, 517, 66, 517, 64, 519);
  bezierVertex(61, 521, 60, 523, 59, 526);
  bezierVertex(58, 528, 56, 531, 56, 536);
  bezierVertex(56, 538, 56, 540, 58, 542);
  bezierVertex(59, 544, 61, 545, 62, 546);
  vertex(62, 546);
  vertex(231, 549);
  bezierVertex(232, 549, 233, 549, 234, 548);
  bezierVertex(234, 548, 236, 548, 236, 546);
  bezierVertex(239, 543, 240, 542, 251, 542);
  bezierVertex(243, 542, 243, 542, 246, 543);
  bezierVertex(246, 543, 247, 543, 248, 544);
  vertex(248, 544);
  vertex(302, 562);
  bezierVertex(302, 562, 307, 564, 309, 569);
  bezierVertex(311, 573, 310, 577, 310, 578);
  bezierVertex(309, 579, 307, 585, 301, 586);
  bezierVertex(295, 588, 290, 584, 289, 582);
  bezierVertex(286, 578, 286, 577, 285, 577);
  bezierVertex(285, 576, 284, 576, 282, 576);
  vertex(282, 576);
  vertex(251,582);
  bezierVertex(246, 576, 244, 573, 240, 572);
  vertex(232, 570);
  vertex(42, 573);
  bezierVertex(40, 575, 37, 579, 36, 586);
  bezierVertex(36, 592, 39, 600, 44, 603);
  bezierVertex(47, 604, 48, 604, 55, 606);
  bezierVertex(60, 608, 61, 610, 62, 610);
  bezierVertex(63, 614, 62, 619, 59, 622);
  bezierVertex(52, 630, 36, 626, 34, 626);
  bezierVertex(26, 624, 25, 621, 14, 618);
  bezierVertex(8, 616, 3, 615, 0, 615);
  endShape(CLOSE);
}

function drawViolin() {
  stroke(255);
  strokeWeight(1);
  fill(0);

  beginShape()
  vertex(0, 725);
  bezierVertex(12, 732, 22, 734, 28, 734);
  bezierVertex(33, 734, 39, 735, 42, 731);
  bezierVertex(45, 727, 43, 721, 46, 720);
  bezierVertex(48, 720, 50, 722, 53, 724);
  bezierVertex(59, 726, 64, 724, 67, 723);
  bezierVertex(75, 721, 87, 722, 97, 725);
  bezierVertex(112, 731, 119, 745, 119, 747);
  bezierVertex(122, 752, 123, 756, 123, 759);
  vertex(203, 773);
  vertex(204, 767);
  bezierVertex(201, 766, 199, 763, 200, 760);
  bezierVertex(201, 756, 204, 756, 206, 757);
  bezierVertex(209, 757, 211, 761, 209, 765);
  vertex(208, 767);
  vertex(208, 775);
  vertex(219, 778);
  vertex(218, 773);
  vertex(217, 773);
  bezierVertex(217, 773, 215, 770, 215, 768);
  bezierVertex(215, 766, 217, 765, 218, 765);
  bezierVertex(219, 764, 221, 764, 221, 765);
  bezierVertex(223, 765, 225, 767, 225, 769);
  bezierVertex(225, 771, 224, 774, 223, 773);
  vertex(222, 779);
  vertex(223, 781);
  vertex(227, 784);
  vertex(234, 790);
  bezierVertex(234, 790, 233, 787, 234, 785);
  bezierVertex(235, 780, 242, 778, 245, 780);
  bezierVertex(246, 781, 246, 782, 247, 783);
  bezierVertex(249, 784, 249, 784, 251, 784);
  bezierVertex(254, 785, 255, 787, 255, 788);
  bezierVertex(257, 790, 257, 794, 255, 797);
  bezierVertex(252, 800, 248, 800, 248, 800);
  vertex(247, 802);
  vertex(243, 803);
  vertex(240, 802);
  vertex(230, 803);
  vertex(229, 808);
  bezierVertex(229, 808, 230, 809, 230, 810 );
  bezierVertex(232, 811, 233, 812, 233, 813);
  bezierVertex(234, 815, 233, 819, 230, 820);
  bezierVertex(228, 821, 226, 821, 225, 820);
  bezierVertex(224, 818, 225, 815, 224, 814);
  bezierVertex(223, 814, 223, 815, 221, 816);
  bezierVertex(220, 816, 217, 818, 214, 816);
  bezierVertex(213, 815, 212, 813, 212, 811);
  bezierVertex(211, 809, 213, 807, 215, 805);
  vertex(215, 799);
  vertex(205, 795);
  bezierVertex(202, 795, 200, 795, 199, 795);
  bezierVertex(197, 794, 195, 794, 194, 792);
  bezierVertex(193, 791, 192, 789, 192, 788);
  bezierVertex(192, 788, 191, 787, 191, 787);
  bezierVertex(190, 786, 188, 786, 188, 786);
  vertex(131, 782);
  bezierVertex(129, 782, 126, 783, 125, 786);
  bezierVertex(124, 787, 124, 788, 124, 789);
  bezierVertex(124, 792, 122, 795, 120, 803);
  bezierVertex(117, 811, 112, 816, 112, 816);
  bezierVertex(108, 820, 103, 824, 96, 826);
  bezierVertex(96, 826, 82, 831, 61, 823);
  bezierVertex(59, 822, 57, 822, 53, 821);
  bezierVertex(52, 821, 51, 821, 50, 820);
  bezierVertex(48, 822, 48, 823, 47, 824);
  bezierVertex(46, 824, 44, 824, 43, 823);
  bezierVertex(42, 821, 44, 820, 44, 817);
  bezierVertex(45, 813, 38, 810, 37, 809);
  bezierVertex(28, 804, 19, 806, 12, 807);
  bezierVertex(7, 808, 2, 809, 0, 810);

  endShape(CLOSE);
}

function drawDrum() {
  stroke(0);
  strokeWeight(1);
  fill(0, 0, 255);
  beginShape();
  vertex(1694, 114);
  vertex(1622, 112);
  bezierVertex(1616, 112, 1614, 111, 1607, 121);
  bezierVertex(1598, 132, 1590, 181, 1590, 228);
  bezierVertex(1590, 271, 1598, 329, 1604, 338);
  bezierVertex(1606, 340, 1607, 342, 1609, 343);
  bezierVertex(1612, 347, 1616, 349, 1620, 349);
  vertex(1694, 345);
  vertex(1694, 292);
  vertex(1654, 297);
  bezierVertex(1654, 297, 1650, 295, 1650, 293);
  vertex(1650, 291);
  bezierVertex(1650, 289, 1651, 287, 1653, 287);
  vertex(1694, 285);
  vertex(1694, 187);
  vertex(1653, 185);
  bezierVertex(1651, 185, 1650, 184, 1650, 182);
  vertex(1650, 179);
  bezierVertex(1650, 177, 1652, 175, 1654, 176);
  vertex(1694, 180);
  endShape(CLOSE);
}

function drawTrumpet3() {
  stroke(255);
  strokeWeight(1);
  fill(0);
  beginShape()
  vertex(1694, 518)
  bezierVertex(1694, 518, 1606, 541, 1580, 467);
  bezierVertex(1530, 398, 1524, 611, 1564, 640);
  bezierVertex(1586, 654, 1590, 596, 1619, 575);
  bezierVertex(1664, 545, 1775, 535, 1773, 615);
  vertex(1730, 609);
  bezierVertex(1748, 492, 1563, 595, 1669, 684);
  bezierVertex(1766, 736, 1693, 693, 1694, 693);
  vertex(1694, 679);
  bezierVertex(1670, 676, 1658, 653, 1655, 648);
  bezierVertex(1656, 648, 1657, 648, 1658, 647);
  bezierVertex(1669, 645, 1679, 650, 1680, 648);
  bezierVertex(1680, 648, 1680, 648, 1680, 647);
  bezierVertex(1672, 642, 1657, 649, 1652, 640);
  bezierVertex(1648, 627, 1651, 596, 1668, 598);
  bezierVertex(1674, 599, 1682, 597, 1686, 602);
  bezierVertex(1686, 618, 1682, 635, 1681, 652);
  bezierVertex(1681, 678, 1721, 680, 1724, 653);
  vertex(1717, 641);
  bezierVertex(1717, 652, 1714, 667, 1700, 664);
  bezierVertex(1692, 662, 1689, 654, 1690, 646);
  vertex(1694, 609);
  vertex(1694, 575);
  bezierVertex(1688, 583, 1691, 592, 1686, 596);
  vertex(1661, 594);
  bezierVertex(1662, 591, 1664, 587, 1667, 582);
  bezierVertex(1673, 574, 1682, 571, 1686, 570);
  vertex(1694, 564);
  vertex(1694, 557);
  endShape(CLOSE);
}

function drawTrumpet4() {
  stroke(0);
  strokeWeight(1);
  fill(255, 0, 0);
  beginShape()
  vertex(1694, 782);
  vertex(1514, 758);
  bezierVertex(1496, 756, 1479, 753, 1461, 749);
  bezierVertex(1454, 747, 1451, 741, 1448, 733);
  vertex(1441, 712);
  vertex(1440, 712);
  vertex(1439, 711);
  bezierVertex(1438, 711, 1437, 714, 1437, 714);
  bezierVertex(1437, 714, 1431, 731, 1430, 740);
  bezierVertex(1427, 752, 1425, 764, 1424, 775);
  bezierVertex(1423, 790, 1423, 806, 1425, 820);
  bezierVertex(1425, 823, 1426, 827, 1429, 824);
  bezierVertex(1434, 807, 1440, 794, 1457, 790);
  bezierVertex(1468, 788, 1481, 787, 1493, 787);
  bezierVertex(1502, 787, 1512, 787, 1522, 788);
  vertex(1631, 792);
  vertex(1694, 798);
  vertex(1694, 805);
  vertex(1681, 804);
  vertex(1683, 796);
  vertex(1666, 795);
  vertex(1666, 803);
  vertex(1663, 803);
  vertex(1665, 794);
  vertex(1649, 793);
  vertex(1648, 801);
  vertex(1645, 801);
  vertex(1646, 793);
  vertex(1631, 792);
  vertex(1629, 800);
  vertex(1556, 791);
  vertex(1544, 789);
  bezierVertex(1541, 789, 1536, 788, 1531, 788);
  bezierVertex(1531, 788, 1519, 788, 1514, 790);
  bezierVertex(1507, 794, 1503, 800, 1502, 802);
  bezierVertex(1497, 811, 1498, 820, 1499, 825);
  bezierVertex(1500, 830, 1501, 838, 1508, 844);
  bezierVertex(1514, 848, 1520, 849, 1522, 850);

  vertex(1621, 861);
  vertex(1620, 870);
  bezierVertex(1619, 873, 1619, 879, 1621, 881);
  bezierVertex(1624, 884, 1632, 884, 1634, 879);
  bezierVertex(1636, 875, 1637, 870, 1637, 865);
  vertex(1640, 865);
  bezierVertex(1639, 869, 1637, 879, 1640, 883);
  bezierVertex(1642, 887, 1651, 886, 1653, 880);
  bezierVertex(1654, 876, 1655, 872, 1656, 867);
  vertex(1657, 867);
  vertex(1656, 876);
  bezierVertex(1656, 876, 1657, 887, 1663, 887);
  bezierVertex(1668, 887, 1670, 884, 1672, 879);
  vertex(1673, 875);
  vertex(1694, 877);
  vertex(1694, 842);
  vertex(1676, 841);
  vertex(1676, 854);
  vertex(1537, 834);
  vertex(1527, 832);
  bezierVertex(1527, 832, 1521, 830, 1519, 828);
  bezierVertex(1514, 823, 1514, 812, 1521, 808);
  bezierVertex(1532, 802, 1549, 806, 1561, 807);
  vertex(1629, 815);
  vertex(1624, 854);
  vertex(1638, 854);
  vertex(1642, 816);
  vertex(1648, 817);
  vertex(1643, 854);
  vertex(1658, 854);
  vertex(1662, 818);
  vertex(1665, 819);
  vertex(1660, 854);
  vertex(1676, 854);
  vertex(1678, 820);
  vertex(1694, 821);

  endShape();

}


