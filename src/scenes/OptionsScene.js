/*global Phaser*/
import * as ChangeScene from './OptionsChangeScene.js';
export default class OptionsScene extends Phaser.Scene
{
  constructor()
  {
    super("Options");
  }
  init(data)
  {
    this.source = data.source

  }

  preload()
  {
    //Preload assets
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.load.audio('InGame','./assets/sounds/InGame2.wav');
    this.load.audio("pausefx","./assets/sounds/Kindlich Text.mp3");
    this.load.image("storeback", "./assets/fullSized/Store Back.png");

    //Declare variables for center of the scene
    this.centerX = this.cameras.main.width/2;
    this.centerY = this.cameras.main.height/2;
  }

  create()
  {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.source)

    //Add music
    this.music = this.sound.add('InGame');
    this.music.play
    ({
      volume:.3,
      loop:true,
      mute:this.registry.get("musicmuted")
    });
    this.pausefx = this.sound.add('pausefx');

    //Load fonts
    WebFont.load
    ({
      google:
      {
        families: ['Permanent Marker', 'Modak', 'Anton', 'Neucha']
      }
    });

    //Display background
    this.add.sprite(400, 280, 'storeback').setScale(0.6);

    //Display text
    var text1 = 'Enter: Return to game\n' +
                'ESC: Main menu\n'
    var text2 = 'M: Mute music\n' +
                'S: Mute SFX';
    var text3 = '(Exit options menu for new changes to take effect)';
    this.spellOutText(100, 285, 290, text1, 30, 20, '#000000', 'Neucha');
    this.spellOutText(450, 285, 200, text2, 30, 20, '#000000', 'Neucha');
    this.spellOutText(100, 375, 500, text3, 30, 20, '#000000', 'Neucha');
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
