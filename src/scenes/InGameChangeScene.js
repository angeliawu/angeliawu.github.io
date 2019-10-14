export { addSceneEventListeners };

function addSceneEventListeners(that, scene){
  that.input.keyboard.on(
    "keydown_R",
      function(){
        that.music.stop();
        that.scene.restart();
      }
  )
  that.input.keyboard.on(
    "keydown_ESC",
      function() {
        that.music.stop();
        that.scene.sleep();
        that.scene.run('Options', {source:scene});
      }
  )
  that.input.keyboard.on(
    "keydown_M",
      function() {
        if (that.music.stop != true){
          this.music.stop();
        }else{
          that.music.start();
        }

      }
  )
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        //this.music.stop();
        that.scene.switch('Boot');
      }
  )
}
