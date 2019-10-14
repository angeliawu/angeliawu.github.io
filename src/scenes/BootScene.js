/*global Phaser*/
import * as ChangeScene from './ChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Boot");
  }

  preload()
  {
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
<<<<<<< Updated upstream
    this.load.audio('theme','./assets/sounds/InGame.wav')
=======
    this.load.audio('theme','./assets/sounds/InGame.wav');
    this.load.spritesheet("playbuttons","./assets/fullSized/playButtons.png",
    {
      frameHeight: 165,
      frameWidth: 388
    });
    this.load.spritesheet("tutorialbuttons","./assets/fullSized/TutButtons.png",
    {
      frameHeight: 158,
      frameWidth: 387
    });
    this.load.spritesheet("optionsbuttons","./assets/fullSized/OptionsButtons.png",
    {
      frameHeight: 158,
      frameWidth: 383
    });
    this.load.image("logo", "./assets/fullSized/Title Text.png");
    this.load.spritesheet('Potato', "./assets/resized/pot32.png",
    {
      frameHeight: 32,
      frameWidth: 22
    });
    this.load.image("Cook", "./assets/fullSized/cook.png");

>>>>>>> Stashed changes
    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY= this.cameras.main.height/2;
  }

  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this)
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

<<<<<<< Updated upstream
    this.cameras.main.setBackgroundColor(0xb79268)
=======
    //Background
    this.cameras.main.setBackgroundColor(0xb6cc9f);

    //Title
    this.add.sprite(425, 110, 'logo').setScale(0.4);

    //Add sprites
    this.add.sprite(150, 400, "Potato").setScale(5);
    this.add.sprite(650, 400, "Cook").setScale(0.25);

    //Play button
    var b1 = this.add.sprite(this.centerX, 300, 'playbuttons', 0).setScale(0.6).setInteractive();
    b1.on("pointerover", function()
    {
      this.setFrame(1);
    });
    b1.on("pointerout", function()
    {
      this.setFrame(0);
    });
    b1.on("pointerup", function()
    {
      this.music.stop();
      this.scene.start('level1');
    }, this
  );

  //Tutorial button
  var b2 = this.add.sprite(this.centerX, 400, 'tutorialbuttons', 2).setScale(0.6).setInteractive();
  b2.on("pointerover", function()
  {
    this.setFrame(1);

  });
  b2.on("pointerout", function()
  {
    this.setFrame(0);
  });
  b2.on("pointerup", function()
  {
    this.music.stop();
    this.scene.start('tutorial');
  }, this
);

//Options button
var b3 =this.add.sprite(this.centerX, 500, 'optionsbuttons', 4).setScale(0.6).setInteractive();
b3.on("pointerover", function()
{
  this.setFrame(1);

});
b3.on("pointerout", function()
{
  this.setFrame(0);
});
b3.on("pointerup", function()
{

  //this.scene.start('Scene2');
  console.log("to be implemented")
}, this
);


>>>>>>> Stashed changes

    var text = 'Fried or Flight'
    var text2 = 'Use the arrows to move, push crates, and avoid the cooks'
    var text3 = 'Press Space bar to start'

    this.spellOutText(170,75,550,text,60,10, '#fff','Permanent Marker');
    this.spellOutText(175,200,450,text2,20,30, '#fff','Anton');
    this.spellOutText(250,300,550,text3,30,50, '#fff','Anton');
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
