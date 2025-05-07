# qjia0024_9103_tut3
Artwork: Piet Mondrian 'Broadway Boogie Woogie'

Method:Time-Based:Employ timers and events for animation.
## Part 1: Imaging Technique Inspiration
>I was inspired by the frame-by-frame animation in Coraline(2009).The way the characters move in small, deliverate steps reminded me of how shapes fall,rotate and move in Tetris.I want to bring the similar feeling to my project by letting shapes shift,change or move gradually. This kind of movement works well for time-based animation because the changes unfold over time, even without any user interaction—just like in stop-motion films or classic video games.
![Image of tetirs-1](assets/Birthday.jpg)
![Image of tetirs-2](assets/coraline.jpg)
![Image of tetirs-3](assets/caroline-doll.gif)

#### The main point I want to achieve
>1.Mimic the step-by-step movement seen in stop-motion films and games like Tetris.<br>
2.Show gradual visual changes over time without needing user input.<br>
3.Make squares of the same color disappear when they connect.<br>
4.Let the final image, formed by all the shapes, represent the group project we create together.





## Part 2: Coding Technique Exploration
>I found that using millis() in p5.js is an effective way to control rhythmic modular transformations over time. This function tracks how much time has passed since the program started, allowing me to trigger shape changes or motion at consistent intervals. It separates animation from user input, making the system fully time-based. By using millis() to control when events happen, I can build animations that express flow, repetition, and progression in a clean and modular visual language.

![Image of millis()-1](assets/millis()-1.png)
![Image of millis()-2](assets/millis()-2.png)

#### Link of coding
1.[millis()](https://p5js.org/reference/p5/millis/)<br>
2.[millis()-example](https://editor.p5js.org/hafferty/sketches/rQ4zjo1sW)<br>


