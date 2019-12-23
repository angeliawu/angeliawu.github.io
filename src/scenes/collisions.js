export default AllCollision;

function AllCollision(danger,that){
  that.matter.world.on('collisionstart', function(event){
    let pairs = event.pairs;
    pairs.forEach(function(pair){
      if ((pair.bodyA.parent.label === "Potato" && danger) || (pair.bodyB.parent.label === "Potato" && danger)){
        //console.log(pair.bodyA);
        if(pair.bodyA.parent.label === "Potato"){
          switch (pair.bodyB.label) {
            case 'Cook':
              that.gameOver();
              break;
            case 'spill':
              that.slip(pair.bodyA, pair.bodyB);
              //console.log('slip')
              break;
            case 'crack':
              that.gameOver();
              break;
            case 'door':
              that.endScene(pair.bodyA.parent, pair.bodyB);
            default:
              break;

          }
          if(pair.bodyB.parent.label == 'spill'){
            that.slip(pair.bodyA.parent, pair.bodyB);
            //console.log('slip')
          }else if(pair.bodyB.parent.label == 'crack'){
            that.gameOver();

          }
        }else{
          switch (pair.bodyA.label) {
            case 'Cook':
              that.gameOver();
              break;
            case 'spill':
              that.slip(pair.bodyA, pair.bodyB);
              //console.log('slip')
              break;
            case 'crack':
              that.gameOver();
              break;
            case 'door':
              that.endScene(pair.bodyB.parent, pair.bodyA);
            default:
              break;

          }
        }
      }else if ((pair.bodyA.parent.label === "Potato" && !danger) || (pair.bodyB.parent.label === "Potato" && !danger)){
        if(pair.bodyA.parent.label === "Potato"){
          switch (pair.bodyB.label) {
            case 'Cook':
              that.gameOver();
              break;

            case 'crack':
              that.gameOver();
              break;
            case 'door':
              //console.log("here")
              that.endScene(pair.bodyA.parent, pair.bodyB);
            default:
              break;

          }
          if(pair.bodyB.parent.label == 'spill'){
            that.slip(pair.bodyA.parent, pair.bodyB);
            //console.log('slip')
          }else if(pair.bodyB.parent.label == 'crack'){
            that.gameOver();

          }

        }else if (pair.bodyB.parent.label === "Potato"){
          switch (pair.bodyA.label) {
            case 'Cook':
              that.gameOver();
              break;
            case 'spill':
              that.slip(pair.bodyB.parent, pair.bodyA);
              //console.log('slip')
              break;
            case 'crack':
              that.gameOver();
              break;
            case 'door':
              that.endScene(pair.bodyB.parent, pair.bodyA);
            default:
              break;

          }
        }
    }
      if (pair.bodyA.parent.label === "Cook"){
        switch (pair.bodyB.label){
          case 'spill':
            that.slip(pair.bodyA, pair.bodyB);
            break;
          default:
            break;

        }
      }
      if (pair.bodyA.parent.label === "Lcrate"){
        switch (pair.bodyB.parent.label){
          case 'spill':
            that.slip(pair.bodyA.parent, pair.bodyB)
            break;
          default:
            break;

        }
      }
      if (pair.bodyB.parent.label === "onion" && danger) {
        switch (pair.bodyA.label) {
          case 'crack':
            that.gameOver();
            break;
          default:
            break;

        }
        if(pair.bodyA.parent.label == 'crack'){
          that.gameOver();

        }
      }
      if (pair.bodyA.parent.label === "onion" && danger) {
        switch (pair.bodyA.label) {
          case 'crack':
            that.gameOver();
            break;
          default:
            break;

        }
        if(pair.bodyB.parent.label == 'crack'){
          that.gameOver();

        }
      }
    /*if (pair.bodyB.label !== "Cook"){
      console.log("bodyA");
      console.log(pair.bodyA.parent.label);
      console.log("bodyB");
      console.log(pair.bodyB.parent.label);
    }*/

    });

  });
}
