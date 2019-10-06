/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js';
import Config from './config/config.js';

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('level1', Level1);
    this.scene.add('level2', Level2);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.add('WinScene',WinScene);

    this.scene.start('level1');
  }
}

window.game = new Game();
