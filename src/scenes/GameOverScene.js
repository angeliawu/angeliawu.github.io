/*global Phaser*/
import * as ChangeScene from './ChangeScene.js'

export default class GameOverScene extends Phaser.Scene {
  constructor () {
    super('GameOverScene');
  }

  init () {
    // Initialization code goes here
  }

  preload () {
    // Preload assets
    this.load.image('logo', './assets/potato.png');

    // Declare variables for center of the scene
    this.centerX = this.cameras.main.width / 2;
    this.centerY = this.cameras.main.height / 2;
  }

  create () {
    //add addSceneEventListeners
    //ChangeScene.addSceneEventListeners(this);
    //Create the scene
    var text = this.add.text(this.centerX-50, this.centerY, 'Game Over');
  }

  update (time, delta) {
    // Update the scene
  }
}
