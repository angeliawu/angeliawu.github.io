export { addSceneEventListeners };

function addSceneEventListeners(that, scene){
  that.input.keyboard.on(
    "keydown_M",
      function(){
        that.pausefx.play({
          volume:.3,
          loop:false,
          mute:that.registry.get("sfxmuted")
        });
        if (that.registry.get("musicmuted")!=true){
          that.registry.set({"musicmuted":true})
        }else{
          that.registry.set({"musicmuted":false})
        }
      }
  )
  that.input.keyboard.on(
    "keydown_S",
      function(){
        that.pausefx.play({
          volume:.3,
          loop:false,
          mute:that.registry.get("sfxmuted")
        });
        if (that.registry.get("sfxmuted")!=true){
          that.registry.set({"sfxmuted":true})
        }else{
          that.registry.set({"sfxmuted":false})
        }
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
  if (scene != undefined){
  that.input.keyboard.on(
    "keydown_ENTER",
      function() {
        that.music.stop();
        console.log(scene);
        console.log(that);
        that.pausefx.play({
          volume:.3,
          loop:false,
          mute:that.registry.get("sfxmuted")
        });
        that.scene.sleep();
        that.scene.run(scene);
        that.music.stop();
      }
    )
  }
}
