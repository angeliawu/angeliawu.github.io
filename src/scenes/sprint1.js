/*global Phaser*/
import * as ChangeScene from './InGameChangeScene.js'

export default class Sprint1 extends Phaser.Scene {
  constructor () {
    super('Sprint1');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image("tiles", "./assets/tilemaps/newTileset.png");
    this.load.tilemapTiledJSON("map", "./assets/tilemaps/FOFlvl1.json");
    this.load.image("crate", "./assets/resized/crate.png");
    this.load.image("Lcrate", "./assets/resized/Lcrate.png");
    this.load.audio("theme","./assets/sounds/InGame.wav");

    //Loads potato player sprite
    //this.load.image("potato", "./assets/potato.png");
    this.load.spritesheet('Potato', "./assets/resized/pot32.png",{
      frameHeight: 32,
      frameWidth: 22
    });

    //Load cook sprite
    this.load.image("cook", "./assets/resized/cook64.png");

    //Load spill sprite
    this.load.image("spill","./assets/resized/spill32.png");

    //Load crack sprites
    this.load.image("crack", "./assets/resized/crack48x48.png");

    //Load exit box
    this.load.image("exit", "./assets/resized/exit.png");

    //Load NPC
    this.load.image("onion", "./assets/resized/onion32.png")
    this.load.image("tomato", "./assets/resized/tomato32.png")
  }


  create() {
    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this)
    //add music
    this.music= this.sound.add('theme');
    this.music.play({
      volume:.3,
      loop:true
    });

    //load map
    this.gameWin = false;
    this.gameLose = false;
    const map = this.make.tilemap({ key: "map"});
    const tileset = map.addTilesetImage("newTileset", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    //create game timer
    this.initialTime = 30
    var text = this.add.text(16, 16, 'Countdown: ' + formatTime(this.initialTime),{
      font: "24px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 },
      backgroundColor: "#000000"
    })
    .setScrollFactor(0)
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
      text.setText('Countdown: ' + formatTime(this.initialTime));
      if (this.initialTime == 0){
        this.gameLose = true;
      }
    }
    worldLayer.setCollisionByProperty({ collides: true});
    //aboveLayer.setDepth(10);
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );

    //player attributes
    this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "Potato");

    this.physics.add.collider(this.player, worldLayer);

    this.cursors = this.input.keyboard.createCursorKeys();
    const camera = this.cameras.main;
    camera.startFollow(this.player);

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.anims.create({
        key: "walk",
        frames: this.anims.generateFrameNumbers('Potato', { start: 0, end: 5}),
        frameRate: 10,
        repeat: -1
      });
    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('Potato', { start: 0, end: 0}),
        frameRate: 10,
        repeat: -1
    });


    //win condition
    var win = map.createFromObjects('Objects','winPoint', {key: 'exit'});
    this.winGroup = this.physics.add.group();
    this.winGroup.children.iterate(function(child) {
      child.setImmoveable(true);
      child.refreshBody();
    });
    this.physics.add.collider(this.winGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.collider(this.player, this.winGroup, this.endScene, null, this);
    for(var i = 0; i < win.length; i++){
      this.winGroup.add(win[i]);
    }

    //enemy attributes
    var enemy = map.createFromObjects('Objects','enemyPoint', {key: 'cook'});
    this.enemyGroup = this.physics.add.group();
    this.enemyGroup.children.iterate(function(child) {
      child.setImmoveable(false);
      child.refreshBody();
    });
    this.physics.add.collider(this.enemyGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.collider(this.player, this.enemyGroup, this.gameOver,null, this);
    //this.physics.add.collider(this.enemyGroup,this.crateGroup);

    this.physics.add.collider(this.enemyGroup);

    for(var i = 0; i < enemy.length; i++){
      this.enemyGroup.add(enemy[i]);
      enemy[i]
      .body
      .CollideWorldBounds = true;
      enemy[i]
      .body.bounce.set(0.1);
      enemy[i]
      .body.setDrag(100);
      enemy[i]
      .body.setSize(32,64,32,32);
      enemy[i]
      .body.width = 32;

    }
    //waterspill attributes
    var spill = map.createFromObjects('Objects','spillPoint', {key: 'spill'});
    this.spillGroup = this.physics.add.group();
    this.spillGroup.children.iterate(function(child) {
      child.setImmoveable(true);
      child.refreshBody();
    });
    this.physics.add.overlap(this.player, this.spillGroup, function(s1,s2){
      var x = this.displace()
      var y = this.displace()
      this.tweens.add({
      targets: s1,
      x: s2.x + x,
      y: s2.y + y,
      ease: "Elastic",
      duration: 2000
    });
  }, null, this);

    this.physics.add.collider(this.spillGroup, worldLayer);
    this.physics.add.overlap(this.enemyGroup, this.spillGroup, function(s1,s2){
      var x = this.displace()
      var y = this.displace()
      this.tweens.add({
      targets: s1,
      x: s2.x + x,
      y: s2.y + y,
      ease: "Elastic",
      duration: 2000
    });
  }, null, this);


    for (var i = 0; i < spill.length; i++){
      this.spillGroup.add(spill[i]);
      spill[i]
      .body
      .CollideWorldBounds = true;
      spill[i]
      .body
      .setMaxVelocity(0);
      spill[i]
      .body.setSize(16,16,32,32);
      spill[i]
      .body.width = 32;
    }
    //Large Crate attributes
    var Lcrate = map.createFromObjects('Objects','LCratePoint', {key: 'Lcrate'});
    this.LcrateGroup = this.physics.add.group();
    this.LcrateGroup.children.iterate(function(child) {
      child.setImmoveable(false);
      child.refreshBody();
    });
    this.physics.add.collider(this.LcrateGroup, worldLayer, function(s1){
      var b1 = s1.body;
      b1.stop();
    });
    this.physics.add.collider(this.player, this.LcrateGroup);
    this.physics.add.collider(this.enemyGroup,this.LcrateGroup);
    this.physics.add.collider(this.LcrateGroup);

    for(var i = 0; i < Lcrate.length; i++){
      this.LcrateGroup.add(Lcrate[i]);
      Lcrate[i]
      .body.bounce.set(0.1);
      Lcrate[i]
      .body.setDrag(100);
      if (Lcrate[i].angle == 90 || Lcrate[i].angle == -90){
        Lcrate[i].body.setSize(32,64);
      }
    }
  }

  update (time, delta) {

    // Update the scene
    if (Math.sin(this.time.now) > 0.7){
      this.enemyView(256);
    }

    if(this.gameWin){
      this.music.stop();
      this.scene.start('WinScene');
      return;
    }else if (this.gameLose) {
      this.music.stop();
      this.scene.start('GameOverScene');
    }
    const speed = 80;
    const prevVelocity = this.player.body.velocity.clone();
    // Stop any previous movement from the last frame
    if (this.cursors.left.isUp && this.cursors.right.isUp && this.cursors.up.isUp && this.cursors.down.isUp){
        this.player.body.setVelocity(0);
          this.player.anims.play('idle', true);
          this.player.angle = 0
    }

    // Horizontal move4ent
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.anims.play('walk', true);
      this.player.flipX = true;
      this.player.angle = 0;
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.anims.play('walk', true);
      this.player.flipX = false;
      this.player.angle = 0;
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
      this.player.anims.play('walk', true);
      this.player.angle = 90;
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
      this.player.anims.play('walk', true);
      this.player.angle = 270;
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);
  }
  enemyView(distance){
    var enemies = this.enemyGroup.getChildren();
    for ( var i = 0; i < enemies.length; i++){
      if (Phaser.Math.Distance.Between(this.player.x, this.player.y, enemies[i].x, enemies[i].y ) <= distance){
        this.enemyChase(enemies[i]);
      }else {
        this.enemyWander(enemies[i]);
      }
    }
  }


  enemyChase(enemy){
    var angleBetween = Phaser.Math.Angle.Between(enemy.x, enemy.y, this.player.x, this.player.y);
    enemy.body.velocity.x = Math.cos(angleBetween) * 40
    enemy.body.velocity.y = Math.sin(angleBetween) * 40
  }

  enemyWander(enemy){

    enemy.body.setVelocityX(Phaser.Math.Between(-100, 100));
    enemy.body.setVelocityY(Phaser.Math.Between(-100, 100));
  }

  endScene(player, winPoint){
    this.gameWin = true;
  }

  gameOver(player, winPoint){
    this.gameLose = true;
  }

  displace(){
    var int = Math.random() < 0.6 ? 40 : 30;
    var plusOrMinus = Math.random() < 0.6 ? -1 : 1;
    //console.log(int)
    return (int * plusOrMinus);
  }

  }
