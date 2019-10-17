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
    var text = this.add.text(16, 750, 'Hello spud! In Fried or Flight \nyou are a brave potato wanting\nto escape the torturous life\nkitchen produce.\n' ,{
      font: "24px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 20 },
      backgroundColor: "#000000"
    });
    var text = this.add.text(16, 950, 'The only controls are the\n arrows keys\nfor their respective directions.' ,{
      font: "24px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(450, 1040, 'These are cracks!\nThe restaurant is littered\nwith them,and they are\ndeadly to you and other\nproduce. So do not fall\nin or let others fall in!' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(720, 1000, 'These are cooks!\nThey are your enemies!\nAvoid them at all costs\nor die trying. As you can\nsee, they are ferocious\nbut can only see so far!' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(990, 920, 'These are long crates!\nMove them around to\nclear a path, or use them to \nblock the cooks from getting\nyou! Either way make sure\nto NOT get underneath one!' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(1390, 920, 'These are short crates!\nThey are exactly like the\nlong crate.\nOne thing to keep in mind is\ncrates are heavy and pushing\nmore of them will slow\nyou down.' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(1990, 920, 'Watch out for spilled water!\nThese will cause you and the cooks to slip!\nThey will slow you down tremendously,\nand when you are racing against the\nclock the last thing you\nwant is lost time.' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(2500, 920, 'These are the other produce\nyou will find on your journey.\nThey will not hurt you but if you\nhurt them you will pay the price!' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    })
    var text = this.add.text(2850, 920, 'Finally,\nremember you are\ntrying to avoid\nthe cooks but\nyou only have\na limited amount of\ntime before the doors\nclose and you are\nTRAPPED!\n\n\n\n\n\n\n\n\nEnter the green squares\nto begin level 1!' ,{
      font: "14px monospace",
      fill: "#00ffee",
      padding: { x: 20, y: 20 }
    });
    return super.create(this.mapKey, 'tutorial', false);


  }
  update(){
    return super.update('level1');


  }

}
