/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("WinScene");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('victory','./assets/sounds/Victory.wav')
    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this)

    //Add music
    this.music=this.sound.add('victory')
    this.music.play({
      volume:.3,
      loop:false
    });
    //Create the scenes
    WebFont.load({
      google:{
        families: ['Candal', 'Modak', 'Anton']
      }
    });

    this.cameras.main.setBackgroundColor(0xdd000)

    var text = 'You Win!'
    var text2  = 'Press Space to play again.'
    this.spellOutText(170,75,550,text,100,10, '#fff','Candal');
    this.spellOutText(250,300,550,text2,30,10,'#fff','Modak');
  }

  spellOutText(x, y, width, text, fontSize, speed, fill, font){
    var sentence = this.add.text(x,y, "", {
      fontSize: fontSize,
      fill: fill,
      fontFamily: font
    });
    var currentLine = this.add.text(10,10,"", {
      fontSize:fontSize,
      fontFamily: font
    });
    currentLine.alpha=0;
    var index = 0;
    var timer;

    //Start the text loop
    startLoop(this);

    function startLoop(that){
      timer = that.time.addEvent({
        delay: speed,
        callback: addChar,
        callbackScope: this,
        loop: true
      });

      function addChar(){
        sentence.text += text[index];
        currentLine.text += text[index];

        if (currentLine.width > width && text[index] === " "){
          sentence.text +=  "\n";
          currentLine.text = "";
        }

        if (index >= text.length - 1){
          timer.remove();
          console.log("stop");
        }
        index++;
      }
    }
  }
}
