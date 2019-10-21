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
        that.scene.sleep();
        that.scene.start(scene);
      }
  )
  that.input.keyboard.on(
    "keydown_ESC",
      function() {
        that.music.stop();
        that.scene.stop(scene);
        that.scene.start('Boot');
      }
  )
  that.input.keyboard.on(
    "keydown_M",
      function() {
        if (that.music.stop != true){
          that.music.stop();
        }else{
          that.music.start();
        }

      }
  )
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        that.music.stop();
        console.log(scene);
        that.scene.sleep();
        that.scene.run(scene);
      }
  )
}
