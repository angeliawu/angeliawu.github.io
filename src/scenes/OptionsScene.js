/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class OptionsScene extends Phaser.Scene
{
  constructor()
  {
    super("Options");
  }
  init(data)
  {
    this.source = data.source
    console.log(this.source)
  }

  preload()
  {
    //Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('theme','./assets/sounds/InGame.wav');
    this.load.image("optionsTitle", "./assets/fullSized/Options Title.png");

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;
  }

  create()
  {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.source)

    //Add music
    this.music = this.sound.add('theme');
    this.music.play
    ({
      volume:.3,
      loop:true
    });

    //Create the scenes
    WebFont.load
    ({
      google:{
        families: ['Permanent Marker', 'Modak', 'Anton', 'Amatic SC']
      }
    });

    //Background
    this.cameras.main.setBackgroundColor(0xffe6cc);

    //Display title
    this.add.sprite(400, 150, "optionsTitle").setScale(0.3);

    //Display text
    var text = 'Press Enter to return to game.\n' +
               'Press F11 to full screen. \n' +
               'Press ESC to return to main menu.\n' +
               'Press R to restart level.';
    this.spellOutText(175, 250, 550, text, 50, 20, '#000000', 'Amatic SC');
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
