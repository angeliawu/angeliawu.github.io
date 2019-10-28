export { addSceneEventListeners };

function addSceneEventListeners(that, scene){
  that.input.keyboard.on(
    "keydown_SPACE",
      function(){
        that.music.stop();
        that.scene.stop(scene);
        that.scene.start(scene);
      }
  )
  that.input.keyboard.on(
    "keydown_R",
      function(){
        that.music.stop();
        that.scene.stop(scene);
        that.pausefx.play({
          volume:.3,
          loop:false
        });
        that.scene.start(scene);
      }
  )
  that.input.keyboard.on(
    "keydown_ESC",
      function() {
        that.music.stop();
        that.scene.stop(scene);
        that.pausefx.play({
          volume:.3,
          loop:false
        });
        that.scene.start('Boot');
      }
  )
  that.input.keyboard.on(
    "keydown_M",
      function() {
        if (that.music.stop != true){
          that.music.stop();
          that.pausefx.play({
            volume:.3,
            loop:false
          });
        }else{
          that.music.start();
          that.pausefx.play({
            volume:.3,
            loop:false
          });
        }

      }
  )
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        that.music.stop();
        console.log(scene);
        that.pausefx.play({
          volume:.3,
          loop:false
        });
        that.scene.sleep();
        that.scene.run(scene);
        that.music.play();
      }
  )
}
