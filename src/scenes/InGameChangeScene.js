export { addSceneEventListeners };

function addSceneEventListeners(that){
  that.input.keyboard.on(
    "keydown_R",
      function(){
        that.scene.start('Scene0');
      }
  )
  that.input.keyboard.on(
    "keydown_ESC",
      function() {
        that.scene.start('Boot');
      }
  )
}
