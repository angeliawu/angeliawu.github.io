/*global Phaser*/
import DefaultScene from './DefaultScene.js'

export default class Tutorial extends DefaultScene {
  constructor () {
    super('level2');
  }
  init(data){
    super.import_test();
    return super.init({level:'level2'});

  }
  preload(){
    this.mapKey = 'map2'
    this.mapPath = "./assets/tilemaps/level2.json"
    return super.preload(this.mapKey, this.mapPath);

  }
  create(){
    return super.create(this.mapKey, true);


  }
  update(){
    return super.update('level3');


  }

}
