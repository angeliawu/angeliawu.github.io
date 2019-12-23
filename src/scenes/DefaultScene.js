/*global Phaser*/
import * as ChangeScene from './InGameChangeScene.js'
import AllCollision from './collisions.js'
import {enemyMasterCheck, playerMasterCheck, worldMasterCheck} from './masterCheck.js'
import loadAssets from './loadAssets.js'
import loadAnims from './loadAnims.js'
import loadObjects from './loadObjects.js'
export default class DefaultScene extends Phaser.Scene {
  constructor () {
    super(Phaser.Scene);
  }

  init (data) {
    // Initialization code goes here
    this.level = data.level

  }


  preload (mapkey, mapPath) {
    // load assets
    loadAssets(mapkey,mapPath,this);
  }


  create(mapKey,danger,time = 30)
  {
    this.danger = danger;
    this.chase = true;
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this, this.level);
    //add music
    var level=this.level
    if (level=='tutorial'){
      this.music=this.sound.add('tutorial')
      this.music.play({
        volume:.3,
        loop: true,
        mute:this.registry.get("musicmuted")
      });
    } else{
    this.music= this.sound.add('InGame');
    this.music.play({
      volume:.3,
      loop:true,
      mute:this.registry.get("musicmuted")
    });}
    //different song for tutorial

    //preset sound effects
    this.splashfx=this.sound.add('splash');
    this.doorfx=this.sound.add('doorfx');
    this.pausefx=this.sound.add('pausefx');
    this.chefsfx=this.sound.add('chefsfx');
    //load map
    this.gameWin = false;
    this.gameLose = false;
    this.door = false;
    this.checkVel = true;
    const map = this.make.tilemap({ key: mapKey});
    const tileset = map.addTilesetImage("newTileset", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    this.worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    //create game timer
    if (danger){
      this.initialTime = time
      this.text = this.add.text(132, 128, 'Countdown: ' + formatTime(this.initialTime),{
        font: "24px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      }).setDepth(30)
      .setScrollFactor(0);
      this.timedEvent = this.time.addEvent({ delay: 1000, callback: countDown, callbackScope: this, loop: true });
      function formatTime(seconds){
        // Minutes
        var minutes = Math.floor(seconds/60);
        // Seconds
        var partInSeconds = seconds%60;
        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');
        // Returns formated time
        return `${minutes}:${partInSeconds}`;
      }
      function countDown ()
      {
        this.initialTime -= 1; // One second
        this.text.setText('Countdown: ' + formatTime(this.initialTime));
        if (this.initialTime == 0){
          this.gameLose = true;
        } else if (this.initialTime == 15){
          this.text.setBackgroundColor('#ff6666')
        } else if (this.initialTime == 10){
          this.text.setBackgroundColor('#ff0000')
        }
      }
    }
    this.worldLayer.setCollisionByProperty({ collides: true});
    aboveLayer.setDepth(25);

    this.matter.world.convertTilemapLayer(this.worldLayer);
    this.matter.world.convertTilemapLayer(aboveLayer);
    //this.matter.world.createDebugGraphic();

    //aboveLayer.setDepth(10);
    this.spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    //Load in animations
    loadAnims(this);
    //load all gameObjects and Player object
    loadObjects(level,map,this);


    this.cursors = this.input.keyboard.createCursorKeys();
    this.camera = this.cameras.main;
    this.camera.startFollow(this.player);
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    this.camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.camera.setZoom(1.5);
    AllCollision(this.danger,this);


  }

  update (next) {
    // Update the scene
    /*
    var musicmuted=this.music.mute; //For muting
    */
    enemyMasterCheck(this);
    playerMasterCheck(this);
    worldMasterCheck(this);

    if(this.gameWin){
      this.music.stop();
      this.scene.start(next);


    }else if (this.gameLose) {
      this.music.stop();
      this.scene.start('GameOverScene',{scene: this.level});
    }




    // Normalize and scale the velocity so that player can't move faster along a diagonal
    //this.player.normalize().scale(speed);
    }
    endScene(player, winPoint){
      //
      if (player.label == "Potato"){
        this.gameWin = true
      }

    }
    gameOver(player, winPoint){
      this.gameLose = true;
    }


    slip(s1,s2){

      //("slip")
      ////(s2.position.x,s2.position.y)
      var initialTime = 0.5
      var timedEvent = this.time.addEvent({ delay: 1000, callback: spillcountDown});
      //this.checkVel = false;

      function spillcountDown ()
      {
        initialTime -= 1; // One second
        ////(initialTime)
        if (initialTime <= 0){

          s1.gameObject.setStatic(false);
          timedEvent.remove();
        }
      }

      var x = s1.position.x + s1.velocity.x * 10;
      var y = s1.position.y + s1.velocity.y * 10
      s1.gameObject.setPosition(x,y)

      if (s1.label == "Lcrate"){
        s1.gameObject.setPosition(x,y)
        return
      }else if (s1.label == "crate"){
        s1.gameObject.setPosition(x,y)
        return
      }else{
        this.splashfx.play({
          volume:.3,
          loop:false,
          mute:this.registry.get("sfxmuted")
        });
        this.waterPart.createEmitter({
          alpha: { start: 1, end: 0 },
            scale: { start: 0.5, end: 5 },
            //tint: { start: 0xff945e, end: 0xff945e },
            speed: 10,
            //gravityX:500,
            gravityY:300,
            accelerationY: -300,
            angle: { min: 0, max: -180 },
            rotate: { min: -180, max: 180 },
            lifespan: { min: 1000, max: 1100 },
            blendMode: 'SCREEN',
            frequency: 110,
            maxParticles: 1,
            x: s1.position.x,
            y: s1.position.y
        })
        s1.gameObject.setPosition(x,y)
        this.cameras.main.shake(500, 0.01)
        //

      }
    }
    import_test(){
      //for stability
    }
  }
