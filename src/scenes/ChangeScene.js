export { addSceneEventListeners };

function addSceneEventListeners(that){
  that.input.keyboard.on(
    "keydown_SPACE",
      function(){
        that.music.stop();
        that.scene.start('level1');
      }
  )
  that.input.keyboard.on(
    "keydown_ESC",
      function() {
        that.music.stop();
        that.scene.start('Boot');
      }
  )
}
