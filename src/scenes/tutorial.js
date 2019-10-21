/*global Phaser*/
import DefaultScene from './DefaultScene.js'

export default class Tutorial extends DefaultScene {
  constructor () {
    super('tutorial');
  }
  init(data){
    super.import_test();
    return super.init({level:'tutorial'});

  }
  preload(){
    this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js');
    this.mapKey = 'tutorial'
    this.mapPath = "./assets/tilemaps/tutorial.json"
    return super.preload(this.mapKey, this.mapPath);

  }
  create(){
    var text = this.add.text(1500, 400, 'The only controls are\nthe arrows keys\nfor their respective\ndirections.' ,{
      font: "24px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    });
    var text = this.add.text(1500, 360, 'Can be moved-- Okay to touch --slip if touched' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    });
    var text = this.add.text(1500, 720, 'will chase you-- Do not touch --bad for produce' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    });
    var text = this.add.text(1280, 250, 'Immoveable' ,{
      font: "24px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    });



    return super.create(this.mapKey, false);


  }
  update(){
    return super.update('level1');


  }

}
