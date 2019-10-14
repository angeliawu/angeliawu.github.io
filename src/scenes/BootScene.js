/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('theme','./assets/sounds/InGame.wav');
    this.load.spritesheet("playbuttons","./assets/fullSized/playButtons.png", {
      frameHeight: 165,
      frameWidth: 388
    });
    this.load.spritesheet("tutorialbuttons","./assets/fullSized/TutButtons.png", {
      frameHeight: 158,
      frameWidth: 387
    });
    this.load.spritesheet("optionsbuttons","./assets/fullSized/OptionsButtons.png", {
      frameHeight: 158,
      frameWidth: 383
    });
    this.load.image("logo", "./assets/fullSized/Title Text.png")

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, "level1")
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
    this.add.sprite(400,75,'logo').setScale(0.7);
    var b1 =this.add.sprite(150,300, 'playbuttons', 0).setInteractive();
    b1.on("pointerover", function(){
      this.setFrame(1);

    });
    b1.on("pointerout", function(){
      this.setFrame(0);
    });
    b1.on("pointerup", function(){
      this.music.stop();
      this.scene.start('level1');
    }, this
  );

  var b2 =this.add.sprite(400,400, 'tutorialbuttons', 2).setInteractive();
  b2.on("pointerover", function(){
    this.setFrame(1);

  });
  b2.on("pointerout", function(){
    this.setFrame(0);
  });
  b2.on("pointerup", function(){
    this.music.stop();
    this.scene.start('tutorial');
  }, this
);

var b3 =this.add.sprite(650,500, 'optionsbuttons', 4).setInteractive();
b3.on("pointerover", function(){
  this.setFrame(1);

});
b3.on("pointerout", function(){
  this.setFrame(0);
});
b3.on("pointerup", function(){
  this.music.stop();
  this.scene.start('Options');

}, this
);




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
