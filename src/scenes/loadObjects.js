import ObjectGenerator from './ObjGen.js'
export default loadObjects

function loadObjects(level,map,that){
  that.hitbox = that.cache.json.get("Shape");
  that.voidPart = that.add.particles('void').setDepth(15);
  that.waterPart = that.add.particles('water').setDepth(15);

  //player attributes
  that.player = that.matter.add.sprite(that.spawnPoint.x, that.spawnPoint.y, "Potato", "Potato" ,{shape: that.hitbox.pot32});
  that.player.setFriction(100)
  that.player.body.label = "Potato";
  that.player.setDepth(10);
  that.player.setSize(20,20)

  //win condition
  that.winGroup = ObjectGenerator(map,'winPoint','door',1, that);
  that.winGroup.forEach(function(element){
    element.setStatic(element, true);
    console.log(that.level)
    console.log(element.angle)
    if ( that.level == 'level2'){
      element.setAngle(-90)
    }
  })
  //enemy attributes
  that.enemyGroup = ObjectGenerator(map, 'enemyPoint', 'Cook', 2, that );
  //(that.enemyGroup);
  that.enemyGroup.forEach(function(element){
    element.setBounce(0);
    element.setFriction(10);
    element.setSize(32,64,32,32);
    element.width = 32;
    element.setTexture('cook')
    element.setDepth(1);
    element.setDensity(100);
    element.setFixedRotation();
    //Initialize with starting velocity
    element.setVelocityX(Phaser.Math.Between(-1.5, 1.5));
    element.setVelocityY(Phaser.Math.Between(-1.5, 1.5));
    /*var ran = Math.random() < 0.5 ? false : true;
    if (ran){
      element.setScale(0.5)
    }else{

    }*/
  });

  that.crateGroup = ObjectGenerator(map, 'cratePoint','crate',3,that);
  that.crateGroup.forEach(function(element){
    element.setBounce(0);
    element.setFriction(1000);
    element.setDepth(1);
    element.setDensity(100);
    //element.setFixedRotation();

  });
  that.LcrateGroup = ObjectGenerator(map, 'LCratePoint','Lcrate',4,that);
  that.LcrateGroup.forEach(function(element){
    element.setBounce(0);
    element.setFriction(1000);
    element.setDepth(5);
    element.setDensity(100);
    var ran = Math.random() < 0.6 ? 0 : 90;
    element.setAngle(ran);
    //element.setFixedRotation();

  });
  that.spillGroup = ObjectGenerator(map,'spillPoint','spill',5,that);
  that.spillGroup.forEach(function(element){

    element.setStatic(element, true);
    element.setScale(0.5);
    element.setSensor(true);
    element.setSensor(true);
    var ran = Math.random() < 0.7 ? false : true;
    if (ran && level != "tutorial") {
      element.destroy();
    }
  });
  //that.physics.add.collider(that.enemyGroup);
  that.crackGroup = ObjectGenerator(map,'crackPoint','crack',6, that);
  that.crackGroup.forEach(function(element){
    element.setStatic(element, true);
    element.setScale(0.7);
    element.setSensor(true);
    var ran = Math.random() < 0.7 ? false : true;
    if (ran && level != "tutorial") {
      element.isActive = false;
      element.destroy();
    }else{
      element.isActive = true;
    }
    if (element.isActive){
      that.voidPart.createEmitter({
        alpha: { start: 1, end: 0 },
          scale: { start: 0.5, end: 1.5 },
          //tint: { start: 0xff945e, end: 0xff945e },
          speed: 10,
          accelerationY: -300,
          angle: { min: -75, max: -95 },
          rotate: { min: -180, max: 180 },
          //lifespan: { min: 1000, max: 1100 },
          blendMode: 'SCREEN',
          frequency: 110,
          maxParticles: 0,
          x: element.body.position.x,
          y: element.body.position.y
      })
    }

  });
  that.NPCGroup = ObjectGenerator(map, 'NPCPoint', 'onion', 7, that,[that.hitbox.Onion_Animation, null]);
  that.NPCGroup.forEach(function(element){
    var ran = Math.random() < 0.6 ? "onion" : "tomato";
    element.setTexture(ran);
    element.setScale(0.7);
    element.setDensity(100);
    element.setFriction(100);
    element.setDepth(1);
    element.setFixedRotation();
    //element.setVelocityX(Phaser.Math.Between(-0.1, 0.1));
    //element.setVelocityY(Phaser.Math.Between(-0.1, 0.1));


  });
  that.exit = ObjectGenerator(map, 'exitPoint','exit', 8, that);
  that.exit.forEach(function(element){
    element.setSensor(true);
  });
}
