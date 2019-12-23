export default ObjectGenerator


function ObjectGenerator(map, pointName, key, collisionGroup, that, config = [null,null]){
  var obj = map.createFromObjects('Objects',pointName, {key: key});

  //console.log(config)
  var group = []
  //this.physics.add.overlap(this.player, this.winGroup, this.endScene, null, this);
  for(var i = 0; i < obj.length; i++){
    if (config[1] != null){
      var proto = that.matter.add.sprite(obj[i].x, obj[i].y, key, key ,{shape: config[0], render:config[1]})
      .setCollisionGroup(collisionGroup);
    }else if (config[0] != null && config[1] == null){
      var proto = that.matter.add.sprite(obj[i].x, obj[i].y, key, key ,{shape: config[0]})
      .setCollisionGroup(collisionGroup);
    } else{
      var proto = that.matter.add.sprite(obj[i].x, obj[i].y, key)
      .setCollisionGroup(collisionGroup);
    }

    proto.body.label = key
    //console.log(proto.body.label)
    group.push(proto)
    //console.log(group)
    obj[i].destroy();
  }
  //console.log(group)
  return group
}
