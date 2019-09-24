/*global Phaser*/
//import * as ChangeScene from './ChangeScene.js'

export default class Scene1 extends Phaser.Scene {
  constructor () {
    super('Scene0');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image("tiles", "./assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "./assets/tilesets/tuxemon-town.json")
    this.load.atlas("atlas","./assets/atlas/atlas.png","./assets/atlas/atlas.json")
    this.load.image("crate", "./assets/tilesets/crate.png")
    this.load.image("lgcrate", "./assets/tilesets/crate.png")
  }


  create() {
    //ChangeScene.addSceneEventListeners(this);
    //load map
    const map = this.make.tilemap({ key: "map"});

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);



    // Help text that has a "fixed" position on the screen
    this.add
      .text(16, 16, "Arrow keys to scroll", {
        font: "18px monospace",
        fill: "#ffffff",
        padding: { x: 20, y: 10 },
        backgroundColor: "#000000"
      })
      .setScrollFactor(0);
    //worldLayer.setCollisionBetween(12, 44);
    worldLayer.setCollisionByProperty({ collides: true});
    //aboveLayer.setDepth(10);
    const spawnPoint = map.findObject(
      "Objects",
      obj => obj.name === "Spawn Point"
    );






  //player attributes
  this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "atlas", "misa-front").setSize(30, 40).setOffset(0, 24);
  this.physics.add.collider(this.player, worldLayer);

  this.cursors = this.input.keyboard.createCursorKeys();
  const anims = this.anims;
    anims.create({
      key: "misa-left-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-right-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-front-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    anims.create({
      key: "misa-back-walk",
      frames: anims.generateFrameNames("atlas", {
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3
      }),
      frameRate: 10,
      repeat: -1
    });
  const camera = this.cameras.main;
  camera.startFollow(this.player);

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


  //Crate attributes
  var crate = map.createFromObjects('Objects','cratePoint', {key: 'crate'});
  this.crateGroup = this.physics.add.group();
  this.crateGroup.children.iterate(function(child) {
    child.setImmoveable(false);
    child.refreshBody();
  });
  this.physics.add.collider(this.crateGroup, worldLayer, function(s1){
    var b1 = s1.body;
    b1.stop();
  });
  this.physics.add.collider(this.player, this.crateGroup);
  this.physics.add.collider(this.crateGroup,this.crateGroup);

  for(var i = 0; i < crate.length; i++){
    this.crateGroup.add(crate[i]);
    crate[i]
    .body
    .CollideWorldBounds = true;
    crate[i]
    .body.bounce.set(0.1);
    crate[i]
    .body.setFriction(200);
    crate[i]
    .body.setDrag(1000);

  }
  var Lgcrate = map.createFromObjects('Objects','lgCratePoint', {key: 'lgcrate'});
  this.LgcrateGroup = this.physics.add.group();
  this.LgcrateGroup.children.iterate(function(child) {
    child.setImmoveable(false);
    child.refreshBody();
    child.body.setScale(2);
  });
  this.physics.add.collider(this.LgcrateGroup, worldLayer, function(s1){
    var b1 = s1.body;
    b1.stop();
  });
  this.physics.add.collider(this.player, this.LgcrateGroup);
  this.physics.add.collider(this.LgcrateGroup,this.crateGroup);
  this.physics.add.collider(this.LgcrateGroup);

  for(var i = 0; i < Lgcrate.length; i++){
    this.LgcrateGroup.add(Lgcrate[i]);
    Lgcrate[i]
    .body
    .CollideWorldBounds = true;
    Lgcrate[i]
    .body.bounce.set(0.1);
    Lgcrate[i]
    .body.setFriction(200);
    Lgcrate[i]
    .body.setDrag(1000);

  }





  }

  update (time, delta) {
    // Update the scene
    const speed = 60;
    const prevVelocity = this.player.body.velocity.clone();
    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal move4ent
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);
    if (this.cursors.left.isDown) {
      this.player.anims.play("misa-left-walk", true);
    } else if (this.cursors.right.isDown) {
      this.player.anims.play("misa-right-walk", true);
    } else if (this.cursors.up.isDown) {
      this.player.anims.play("misa-back-walk", true);
    } else if (this.cursors.down.isDown) {
      this.player.anims.play("misa-front-walk", true);
    } else {
      this.player.anims.stop();
    // If we were moving, pick and idle frame to use
    if (prevVelocity.x < 0) this.player.setTexture("atlas", "misa-left");
    else if (prevVelocity.x > 0) this.player.setTexture("atlas", "misa-right");
    else if (prevVelocity.y < 0) this.player.setTexture("atlas", "misa-back");
    else if (prevVelocity.y > 0) this.player.setTexture("atlas", "misa-front");
    }

    }
  }
