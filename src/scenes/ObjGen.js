export default ObjectGenerator


function ObjectGenerator(map, pointName, key, collisionGroup, that, config){
  var obj = map.createFromObjects('Objects',pointName, {key: key});

  var group = []
  //this.physics.add.overlap(this.player, this.winGroup, this.endScene, null, this);
  for(var i = 0; i < obj.length; i++){
    var proto = that.matter.add.sprite(obj[i].x, obj[i].y, key)
    .setCollisionGroup(collisionGroup);
    proto.body.label = key
    //console.log(proto.body.label)
    group.push(proto)
    //console.log(group)
    obj[i].destroy();
  }
  //console.log(group)
  return group
}
