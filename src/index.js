/*global Phaser, window*/
import BootScene from './scenes/BootScene.js';
import Level1 from './scenes/level1.js';
import Level2 from './scenes/level2.js';
import Level3 from './scenes/level3.js';
import Level4 from './scenes/level4.js';
import GameOverScene from './scenes/GameOverScene.js';
import WinScene from './scenes/WinScene.js';
import Config from './config/config.js';
import Tutorial from './scenes/tutorial.js'
import Options from './scenes/OptionsScene.js'

class Game extends Phaser.Game {
  constructor () {
    super(Config);
    this.scene.add('Boot', BootScene);
    this.scene.add('level1', Level1);
    this.scene.add('level2', Level2);
    this.scene.add('level3', Level3);
    this.scene.add('level4', Level4);
    this.scene.add('GameOverScene', GameOverScene);
    this.scene.add('WinScene',WinScene);
    this.scene.add('tutorial', Tutorial)
    this.scene.add('Options', Options)

    this.scene.start('Boot');
  }
}

window.game = new Game();
