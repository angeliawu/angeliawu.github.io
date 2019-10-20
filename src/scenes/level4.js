import DefaultScene from './DefaultScene.js'

export default class Tutorial extends DefaultScene {
  constructor () {
    super('level4');
  }
  init(data){
    super.import_test();
    return super.init({level:'level4'});

  }
  preload(){
    this.mapKey = 'map4'
    this.mapPath = "./assets/tilemaps/level4.json"
    return super.preload(this.mapKey, this.mapPath);

  }
  create(){
    return super.create(this.mapKey, 'WinScene', true);


  }
  update(){
    return super.update('WinScene');


  }

}
