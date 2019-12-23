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
        that.scene.stop(scene);
        that.pausefx.play({
          volume:.3,
          loop:false,
          mute:that.registry.get("sfxmuted")
        });
        that.scene.start('Boot');
      }
  )
}
