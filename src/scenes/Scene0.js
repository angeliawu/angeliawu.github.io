/*global Phaser*/
//import * as ChangeScene from './ChangeScene.js'

export default class Scene0 extends Phaser.Scene {
  constructor () {
    super('Scene0');
  }

  init (data) {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image("tiles", "./assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "./assets/tilesets/tuxemon-town.json");
    this.load.atlas("atlas","./assets/atlas/atlas.png","./assets/atlas/atlas.json");
    this.load.image("crate", "./assets/crate.png");
    this.load.image("Lcrate", "./assets/Lcrate.png");

    //Loads potato player sprite
    this.load.image("potato", "./assets/potato.png");

    //Load cook sprite
    this.load.image("cook", "./assets/cook64.png");

    //Load spill sprite
    this.load.image("spill","./assets/spill32.png")
  }


  create() {
    //ChangeScene.addSceneEventListeners(this);
    //load map
    const map = this.make.tilemap({ key: "map"});

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");
    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

    this.gameWin = false;
    this.gameLose = false;



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
  this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, "potato");
  this.physics.add.collider(this.player, worldLayer);

  this.cursors = this.input.keyboard.createCursorKeys();
  const camera = this.cameras.main;
  camera.startFollow(this.player);

  // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

  //win condition
  var win = map.createFromObjects('Objects','winPoint', {key: 'win'});
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
    .body.setDrag(100);
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
  this.physics.add.collider(this.crateGroup,this.LcrateGroup);
  this.physics.add.collider(this.LcrateGroup);

  for(var i = 0; i < Lcrate.length; i++){
    this.LcrateGroup.add(Lcrate[i]);
    Lcrate[i]
    .body
    .CollideWorldBounds = true;
    Lcrate[i]
    .body.bounce.set(0.1);
    Lcrate[i]
    .body.setDrag(100);
    if (Lcrate[i].angle == 90 || Lcrate[i].angle == -90){
      Lcrate[i].body.setSize(32,64);
    }
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
  this.physics.add.collider(this.enemyGroup,this.crateGroup);
  this.physics.add.collider(this.enemyGroup,this.LcrateGroup);
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

  }
  //waterspill attributes
  var spill = map.createFromObjects('Objects','spillPoint', {key: 'spill'});
  this.spillGroup = this.physics.add.group();
  this.spillGroup.children.iterate(function(child) {
    child.setImmoveable(true);
    child.refreshBody();
  });
  this.physics.add.overlap(this.player, this.spillGroup, this.spill, null, this);
  this.physics.add.collider(this.spillGroup, worldLayer);
  this.physics.add.overlap(this.enemyGroup, this.spillGroup, function(s1){
    s1.body.setVelocityX(Phaser.Math.Between(-2500, 2500));
    s1.body.setVelocityY(Phaser.Math.Between(-2500, 2500));
    console.log("slip!")
  });
  for (var i = 0; i < spill.length; i++){
    this.spillGroup.add(spill[i]);
    spill[i]
    .body
    .CollideWorldBounds = true;
    spill[i]
    .body
    .setMaxVelocity(0);
  }

  }

  update (time, delta) {
    // Update the scene
    if (this.time.now % 100 != 0){
      this.enemyView(128);
    }


    if(this.gameWin){
      this.scene.start('WinScene');
      return;
    }else if (this.gameLose) {
      this.scene.start('GameOverScene');
    }
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

      enemy.body.setVelocityX(Phaser.Math.Between(-180, 180));
      enemy.body.setVelocityY(Phaser.Math.Between(-180, 180));
    }
    endScene(player, winPoint){
      this.gameWin = true;
    }
    gameOver(player, winPoint){
      this.gameLose = true;
    }
    spill(player, spill){
      this.player.body.setVelocityX(Phaser.Math.Between(-2500, 2500));
      this.player.body.setVelocityY(Phaser.Math.Between(-2500, 2500));
      console.log("slip!")

    }

  }
