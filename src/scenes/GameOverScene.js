/*global Phaser*/
import * as ChangeScene from './ChangeScene.js'

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOverScene');
  }

  init (data) {
    // Initialization code goes here
    //this.Source = data.scene;
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('End','./assets/sounds/End.wav')
    this.load.image('tomato','./assets/fullSized/tomato.png')
    this.load.image('fries','./assets/fullSized/Fries.png')
    this.load.image('onion','./assets/fullSized/onion.png')
    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.Source);

    //Add music
    this.music=this.sound.add('End')
    this.music.play({
      volume:.3,
      loop:true
    });
    this.add.sprite(700, 500,'onion')
    this.add.sprite(400, 450,'fries').setScale(0.6)
    this.add.sprite(200, 500,'tomato').setScale(0.7)
    //Create the scenes
    WebFont.load({
      google:{
        families: ['Candal', 'Modak', 'Anton']
      }
    });

    this.cameras.main.setBackgroundColor(0x333)

    var text = 'Game over!'
    var text2  = 'Press Space to play again.'
    this.spellOutText(75,75,550,text,100,10, '#fff','Candal');
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
