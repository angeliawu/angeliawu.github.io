/*global Phaser*/
import * as ChangeScene from './GameOverChangeScene.js'

export default class GameOverScene extends Phaser.Scene
{
  constructor ()
  {
    super('GameOverScene');
  }

  init (data)
  {
    // Initialization code goes here
    this.Source = data.scene;
  }

  preload()
  {
    //Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('End','./assets/sounds/End.wav');
    this.load.image('fries','./assets/fullSized/Fries.png');
    this.load.image("gameOverText", "./assets/fullSized/Game Over Text.png");
    this.load.audio("pausefx","./assets/sounds/Kindlich Text.mp3");

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY = this.cameras.main.height/2;
  }

  create()
  {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.Source);

    //Add sound effects
    this.pausefx=this.sound.add('pausefx');
    //Add music
    this.music = this.sound.add('End')
    this.music.play
    ({
      volume:.3,
      loop:true,
      mute:this.registry.get("musicmuted")
    });

    //Add title
    this.add.sprite(400, 100, 'gameOverText').setScale(0.5);

    //Add sprite
    this.add.sprite(150, 350,'fries').setScale(0.6);

    //Load fonts
    WebFont.load
    ({
      google:{
        families: ['Candal', 'Modak', 'Anton', 'Neucha']
      }
    });

    //Set background
    this.cameras.main.setBackgroundColor(0x000000);

    //Display text
    var text  = 'You got fried. \n' +
                'Better luck next time. \n\n' +
                'Space bar: Play again'
    this.spellOutText(300, 250, 550, text, 50, 10, '#fff', 'Neucha');
  }


  spellOutText(x, y, width, text, fontSize, speed, fill, font)
  {
    var sentence = this.add.text(x,y, "",
    {
      fontSize: fontSize,
      fill: fill,
      fontFamily: font
    });
    var currentLine = this.add.text(10,10,"",
    {
      fontSize:fontSize,
      fontFamily: font
    });
    currentLine.alpha = 0;
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
