/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('theme','./assets/sounds/InGame.wav')
    this.load.spritesheet("buttons","./assets/spriteSheets/buttons.png", {
      frameHeight: 100,
      frameWidth: 200
    });
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

    this.cameras.main.setBackgroundColor(0xb79268)

    var text = 'Fried or Flight'
    var text2 = 'Use the arrows to move, push crates, and avoid the cooks'
    var b1 =this.add.sprite(150,100, 'buttons', 0).setInteractive();
    b1.on("pointerover", function(){
      this.setFrame(1);
      sound.play('low');
    });
    b1.on("pointerout", function(){
      this.setFrame(0);
    });
    b1.on("pointerup", function(){
      sound.play('high');
      this.scene.start('Scene0');
    }, this
  );

  var b2 =this.add.sprite(400,100, 'buttons', 2).setInteractive();
  b2.on("pointerover", function(){
    this.setFrame(3);
    sound.play('low');
  });
  b2.on("pointerout", function(){
    this.setFrame(2);
  });
  b2.on("pointerup", function(){
    sound.play('high');
    this.scene.start('Scene1');
  }, this
);

var b3 =this.add.sprite(650,100, 'buttons', 4).setInteractive();
b3.on("pointerover", function(){
  this.setFrame(5);
  sound.play('low');
});
b3.on("pointerout", function(){
  this.setFrame(4);
});
b3.on("pointerup", function(){
  sound.play('high');
  this.scene.start('Scene2');
}, this
);
    var text3 = 'Press Space bar to start Level 1'
    var text4 = 'Press Enter to start tutorial'

    this.spellOutText(170,75,550,text,60,10, '#fff','Permanent Marker');
    this.spellOutText(175,200,450,text2,20,30, '#fff','Anton');
    this.spellOutText(250,300,550,text3,30,50, '#fff','Anton');
    this.spellOutText(250,350,550,text4,30,50, '#fff','Anton');
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
