/*global Phaser*/
//import * as ChangeScene from './InGameChangeScene.js'
import DefaultScene from './DefaultScene.js'
//new DefaultScene
export default class Level1 extends DefaultScene {

    constructor(){
      super('level1')


    }
    init(data){
      super.import_test();
      return super.init({level:'level1'});

    }
    preload(){
      this.mapKey = 'map1'
      this.mapPath = "./assets/tilemaps/level1.json"
      return super.preload(this.mapKey, this.mapPath);

    }
    create(){
      return super.create(this.mapKey, 'level1', true);


    }
    update(){
      return super.update('level2');


    }
  }
