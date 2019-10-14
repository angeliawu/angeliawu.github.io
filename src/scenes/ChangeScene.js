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
    "keydown_ESC",
      function() {
        that.music.stop();
        that.scene.start('Boot');
      }
  )
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        that.music.stop();
        that.scene.start('tutorial');
      }
  )
}
