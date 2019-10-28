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
        that.pausefx.play({
          volume:.3,
          loop:false
        });
        that.scene.run('Options', {source:scene});
      }
  )
  that.input.keyboard.on(
    "keydown_M",
      function() {
        if (that.musicmuted == true){
          that.music.setMute(false);
          that.musicmuted=false;
        }else{
          that.music.setMute(true);
          that.musicmuted=true;
        }

      }
  )
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        that.scene.stop();
        that.music.stop();
        that.scene.start('Boot');
      }
  )
}
