/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Scene0 from './scenes/Scene0.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js';

import Config from './config/config.js';


class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('Scene0', Scene0);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.add('WinScene',WinScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
