import DefaultScene from './DefaultScene.js'

export default class Tutorial extends DefaultScene {
  constructor () {
    super('level3');
  }
  init(data){
    super.import_test();
    return super.init({level:'level3'});

  }
  preload(){
    this.mapKey = 'map3'
    this.mapPath = "./assets/tilemaps/level3.json"
    return super.preload(this.mapKey, this.mapPath);

  }
  create(){
    return super.create(this.mapKey, 'level3', true);


  }
  update(){
    return super.update('level4');


  }

}
