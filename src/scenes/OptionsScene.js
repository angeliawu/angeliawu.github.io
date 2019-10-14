/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class OptionsScene extends Phaser.Scene {
  constructor() {
    super("Options");
  }
  init(data){
    this.source = data.source
    console.log(this.source)
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('theme','./assets/sounds/InGame.wav');

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.source)
    //add music
    this.music=this.sound.add('theme');
    this.music.play({
      volume:.3,
      loop:true
    });

    //Create the scenes
    WebFont.load({
      google:{
        families: ['Permanent Marker', 'Modak', 'Anton']
      }
    });

    this.cameras.main.setBackgroundColor(0xfffff)
    var text = 'Options'
    var text2  = 'Press Enter to return to game.\nPress F11 to full screen.\nPress ESC to return to main menu.\nPress R to restart level.'
    this.spellOutText(200,75,550,text,100,10, '#fff','Candal');
    this.spellOutText(200,300,550,text2,30,10,'#fff','Modak');

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
