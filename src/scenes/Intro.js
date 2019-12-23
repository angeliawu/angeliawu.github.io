/*global Phaser*/
import * as ChangeScene from './WinChangeScene.js';
export default class BootScene extends Phaser.Scene {
  constructor() {
    super("Intro");
  }

  preload(){
    // Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('victory','./assets/sounds/Victory.wav')
    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY=this.cameras.main.height/2;

    //Load background
    this.load.image("winScreen", "./assets/fullSized/Win Screen.png")
  }

  create() {
    //Generate sound mutability
    this.registry.set({"sfxmuted":false});
    this.registry.set({"musicmuted":false});
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this,'level1')

    //Add music
    this.music=this.sound.add('victory')
    this.music.play({
      volume:.3,
      loop:false,
      mute:this.registry.get("musicmuted")
    });
    //Create the scenes
    WebFont.load({
      google:{
        families: ['Candal', 'Modak', 'Anton']
      }
    });

    //Add background
    this.add.sprite(400, 280, 'winScreen').setScale(0.3);
    //Add text
    var content = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "The young, innocent spud lived a great, starch filled life with its family out in the wild.",
        "That was until one day, it found itself inexplicably inside a restaurant.",
        "Not wanting to become a delicious cut of fries (I wouldn't be a hesi-tator to become fries honestly), nor leaving you as a spec-tater, the potato asks for your guidance in helping it escape its purgatory in the kitchen.",
        "Will you achieve the impossible and escape this obnoxiously chaotic restaurant and its atrocious design created to turn you into a hot potato?",
        "Will you instead be turned into a delicious, salty side order of french fries that will satisfy yet another patron of the establishment, as was the fate of Darth Tator?",
        "The potato's fate rests in your hands, and maybe even a tad bit on how well you can maintain your composure through this absurd kitchen.",
        "Good luck, and may the starch guide you!"
    ];

    var graphics = this.make.graphics();

    // graphics.fillRect(topleftx,toplefty,width,height)
    graphics.fillRect(300, 50, 200, 150);

    var mask = new Phaser.Display.Masks.GeometryMask(this, graphics);

    var text = this.add.text(300, 20, content, { fontFamily: 'Candal', color: '#000000', wordWrap: { width: 200 } }).setOrigin(0);

    text.setMask(mask);

    var tween = this.tweens.add({
    targets: text,
    y:-1100,
    //ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
    delay:1000,
    duration: 85000,
    ease: 'Linear'
    });

    //Display text
    var text1 = 'Press Space to Skip'
    this.spellOutText(275, 0, 300, text1, 30, 250, '#000000', 'Neucha');

  }

  //Gradually spells text out
  spellOutText(x, y, width, text, fontSize, speed, fill, font)
  {
    var sentence = this.add.text
    (x, y, "",
      {
        fontSize: fontSize,
        fill: fill,
        fontFamily: font
      }
    );
    var currentLine = this.add.text
    (10, 10, "",
      {
        fontSize:fontSize,
        fontFamily: font
      }
    );
    currentLine.alpha = 0;
    var index = 0;
    var timer;

    //Start the text loop
    startLoop(this);

    function startLoop(that)
    {
      timer = that.time.addEvent
      ({
        delay: speed,
        callback: addChar,
        callbackScope: this,
        loop: true
      });

      function addChar()
      {
        sentence.text += text[index];
        currentLine.text += text[index];

        if (currentLine.width > width && text[index] === " ")
        {
          sentence.text +=  "\n";
          currentLine.text = "";
        }

        if (index >= text.length - 1)
        {
          timer.remove();
          console.log("stop");
        }
        index++;
      }
    }
  }


  }
