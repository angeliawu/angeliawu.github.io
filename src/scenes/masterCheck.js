export {enemyMasterCheck, playerMasterCheck, worldMasterCheck}

function enemyMasterCheck(that){
  function enemyView(distance){
      var enemies = that.enemyGroup;
      for ( var i = 0; i < enemies.length; i++){
        if (Phaser.Math.Distance.Between(that.player.x, that.player.y, enemies[i].x, enemies[i].y ) <= distance){
          enemyChase(enemies[i]);
          that.chase = true;
          //chefsfx will lopp while in range
          if (that.chefsfx.isPlaying == false){
            that.chefsfx.play({
              volume:.3,
              loop: false,
              mute:that.registry.get("sfxmuted")
            });
          }
          //chefsfx will loop while in range

        }else {
          that.chase = false;
        }
      }
    }
  function setAngryFrame(enemy){
    that.voidPart.createEmitter({
      alpha: { start: 0.5, end: 0 },
        scale: { start: 0.5, end: 2.5 },
        //tint: { start: 0xff945e, end: 0xff945e },
        speed: 10,
        //gravityX:500,
        gravityY:300,
        accelerationY: -300,
        angle: { min: 0, max: -180 },
        rotate: { min: -180, max: 180 },
        lifespan: { min: 1000, max: 1100 },
        blendMode: 'ADD',
        frequency: 110,
        maxParticles: 1,
        x: enemy.body.position.x,
        y: enemy.body.position.y
    })
    if (enemy.body.velocity.x < 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('angry_chase', true)
      enemy.flipX = false;
    } else if(enemy.body.velocity.x > 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('angry_chase', true)
      enemy.flipX = true;
    }
    else if (enemy.body.velocity.y < 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('angry_away', true)
    } else if(enemy.body.velocity.y > 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('angry_idle', true)
    }
  }
  function setEnemyFrame(enemy){
    for (let key in enemy.anims.currentAnim){
      //console.log(enemy.anims.currentAnimkey)
    }
   //console.log("cook",enemy.body.velocity.x,enemy.body.velocity.y)
    if (enemy.body.velocity.x < 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('cook_Cont_right', true)
      enemy.flipX = false;
    } else if(enemy.body.velocity.x > 0 && Math.abs(enemy.body.velocity.x) > Math.abs(enemy.body.velocity.y)){
      //enemy.anims.play('cook_walk_right')
      enemy.anims.play('cook_Cont_right', true)
      enemy.flipX = true;
    }
    else if (enemy.body.velocity.y < 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('cook_walk_up', true)
    } else if(enemy.body.velocity.y > 0 && Math.abs(enemy.body.velocity.x) < Math.abs(enemy.body.velocity.y)){
      enemy.anims.play('cook_idle', true)
    }
    //console.log(enemy.anims)

  }
  function enemyChase(enemy){
    var  i = enemy
    function degrees(radians) {
      return radians * 180 / Math.PI;
    }
    var angleBetween = Phaser.Math.Angle.Between(i.x, i.y, that.player.x, that.player.y);
    ////(degrees(angleBetween))
    i.setVelocityX(Math.cos(angleBetween) * 1.5);
    i.setVelocityY(Math.sin(angleBetween) * 1.5);
    setAngryFrame(i);

  }
  function enemyCheckSpeed(){
      var enemies = that.enemyGroup;
      ////(enemies[0].body.velocity);

        for ( var i = 0; i < enemies.length; i++){
          if (Math.abs(enemies[i].body.velocity.y) < 0.05){
            enemies[i].setVelocityY(0);
          }
          if (Math.abs(enemies[i].body.velocity.x) < 0.003){
            enemies[i].setVelocityX(0);
          }
          if (enemies[i].body.velocity.x == 0 || enemies[i].body.velocity.y == 0){
            enemies[i].setVelocityX(Phaser.Math.Between(-1.5, 1.5));
            enemies[i].setVelocityY(Phaser.Math.Between(-1.5, 1.5));

          }else{
            enemies[i].setVelocityX(enemies[i].body.velocity.x);
            enemies[i].setVelocityY(enemies[i].body.velocity.y);

          }
          if (!that.chase){
            setEnemyFrame(enemies[i]);
          }
      }
   }
   function enemyMaxSpeedCheck(){
      var enemies = that.enemyGroup;
      ////(enemies[0].body.velocity);
      for ( var i = 0; i < enemies.length; i++){
        enemies[i].setAngularVelocity(0);
        //console.log(enemies[i].body.velocity.x,enemies[i].body.velocity.y)
        if (enemies[i].body.velocity.x > 1.5){
          enemies[i].setVelocityX(1);

        }else if (enemies[i].body.velocity.x < -1.5){
          enemies[i].setVelocityX(-1);
        }
        if (enemies[i].body.velocity.y > 1.5){
          enemies[i].setVelocityY(1);
        }else if (enemies[i].body.velocity.y < -1.5){
         enemies[i].setVelocityY(-1);
        }
        if (enemies[i].body.velocity.y == NaN && enemies[i].body.velocity.x == NaN){
          enemies[i].prevPosition();
        }
        //setEnemyFrame(enemies[i]);
      }

   }
   enemyCheckSpeed()
   if (Math.sin(that.time.now) > 0.3){
     enemyView(150);
   }
   enemyMaxSpeedCheck()


}

function playerMasterCheck(that){
  function playerSpeedCheck(bool){

      that.player.body.inertia = 20
      //console.log(that.player.body.position)
      //console.log(that.player.body.position.x, that.player.body.position.y)
      if (that.player.body.position.y < 0 || that.player.body.position.x < 0){
        that.player.setPosition(that.player.body.positionPrev.x, that.player.body.positionPrev.y)
        that.player.setDepth(10);
        //console.log("error")
        //console.log("returned",that.player.body.position.x, that.player.body.position.y)
      }
      if (bool){
        if (that.player.body.velocity.x > 1.5){
          that.player.setVelocityX(1);
        }else if (that.player.body.velocity.x < -1.5){
          that.player.setVelocityX(-1);
        }
        if (that.player.body.velocity.y > 1.5){
          that.player.setVelocityY(1);
        }else if (that.player.body.velocity.y < -1.5){
         that.player.setVelocityY(-1);
        }
      }

  }
  function inputCheck(){
    const speed = 1.3;
    //const prevVelocity = that.player.body.velocity.clone();
    // Stop any previous movement from the last frame
    if (that.cursors.left.isUp && that.cursors.right.isUp && that.cursors.up.isUp && that.cursors.down.isUp){
        that.player.setVelocity(0);
          that.player.anims.play('idle', true);
          that.player.angle = 0;
    }

    // Horizontal move4ent
    if (that.cursors.left.isDown) {
      that.player.setVelocityX(-speed);
      that.player.anims.play('walk', true);
      that.player.flipX = true;
      that.player.angle = 0;
      that.player.setSize(22,32,32,32);
    } else if (that.cursors.right.isDown) {
      that.player.setVelocityX(speed);
      that.player.anims.play('walk', true);
      that.player.flipX = false;
      that.player.angle = 0;
      that.player.setSize(22,32,32,32);
    }else{
      that.player.setVelocityX(0);
    }

    // Vertical movement
    if (that.cursors.up.isDown) {
      that.player.setVelocityY(-speed);
      that.player.anims.play('walk', true);
      that.player.angle = 90;
      that.player.setSize(32,22,32,32);
    } else if (that.cursors.down.isDown) {
      that.player.setVelocityY(speed);
      that.player.anims.play('walk', true);
      that.player.angle = 270;
      that.player.setSize(32,22,32,32);
    }else{
      that.player.setVelocityY(0);
    }
  }
  inputCheck()
  playerSpeedCheck(that.checkVel)

}


function worldMasterCheck(that){
  function doorCheck(distance){
      var win = that.winGroup;
      if (that.door == false){
        for ( var i = 0; i < win.length; i++){
          let dist = Phaser.Math.Distance.Between(that.player.x, that.player.y, win[i].x, win[i].y )
          if (dist <= distance){
            ////('detected')
            win[i].anims.play('door_open', true)
            //doorfx
            that.doorfx.play({
              volume:.7,
              loop:false
            });
            that.door = true;
          }
        }
      }

  }
  function NPCCheckSpeed(){
      var NPCs = that.NPCGroup;
      for ( var i = 0; i < NPCs.length; i++){
        var velXFLT = NPCs[i].body.velocity.x
        var velX = velXFLT.toPrecision(2)
        var velYFLT = NPCs[i].body.velocity.y
        var velY = velYFLT.toPrecision(2)

        if (Math.abs(velX) < 0.001){
          velX = 0;
        }
        if (Math.abs(velY) < 0.00045){
          velY = 0;
        }
        if (velX == 0 && velY == 0){
          NPCs[i].angle = 0;
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_idle', true);
            NPCs[i].flipX = false;
          }else {
            NPCs[i].anims.play('tomato_idle', true);
            NPCs[i].flipX = false;
          }

        }
        else if (velX > 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
          }
        }
        else if (velX < 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
            NPCs[i].flipX = true;
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
            NPCs[i].flipX = true;
          }
        }
        else if (velY < 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
            NPCs[i].angle = 90;
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
            NPCs[i].angle = 90;
          }
        }
        else if (velY > 0) {
          if (String(NPCs[i].texture.key) === "onion"){
            NPCs[i].anims.play('onion_pushed', true);
            NPCs[i].angle = 270;
          }else {
            NPCs[i].anims.play('tomato_pushed', true);
            NPCs[i].angle = 270;
          }
        }

      }
    }
    doorCheck(128)
    NPCCheckSpeed()

}
