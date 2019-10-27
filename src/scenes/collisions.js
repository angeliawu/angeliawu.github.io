export default AllCollision

function AllCollision(danger,that){
  that.matter.world.on('collisionstart', function(event){
    let pairs = event.pairs;
    pairs.forEach(function(pair){
      if (pair.bodyA.label === "Potato"){
        switch (pair.bodyB.label) {
          case 'Cook':
            that.gameOver()
            break;
          case 'spill':
            that.slip(pair.bodyA, pair.bodyB)
            break;
          case 'crack':
            that.gameOver();
            break;

          default:
            break;

        }
      }
    console.log("bodyA")
    console.log(pair.bodyA.label)
    console.log("bodyB")
    console.log(pair.bodyB.label)
    })

  });
}
