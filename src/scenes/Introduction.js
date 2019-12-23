import * as ChangeScene from './WinChangeScene.js';
export default class BootScene extends Phaser.Scene
{
  constructor()
  {
    super("Introduction");
  }

  preload()
  {
    //Load the trailer
    this.load.video("Video", './assets/Intro Scene.mp4');

    //Load skip text
    this.load.image("Text", './assets/fullSized/Skip Text.png')

    //Add change scene event listeners
    ChangeScene.addSceneEventListeners(this,'Introduction')
  }

  create()
  {
    //Display video
    this.video = this.add.video(400, 301, "Video").setScale(0.43);
    this.video.play();

    //Display skip text
    this.add.image(410, 567, "Text").setScale(0.06);
  }
}
