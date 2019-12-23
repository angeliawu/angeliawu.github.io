import DefaultScene from './DefaultScene.js';

export default class Tutorial extends DefaultScene
{
  constructor()
  {
    super('tutorial');
  }
  init(data)
  {
    return super.init({level:'tutorial'});
  }
  preload()
  {
    //Load the tutorial video
    this.load.video("TutorialVideo", './assets/Fried or Flight Tutorial.mp4');

    this.mapKey = 'tutorial';
    this.mapPath = "./assets/tilemaps/tutorial.json";
    return super.preload(this.mapKey, this.mapPath);
  }
  create()
  {
    //Display video
    this.TutorialVideo = this.add.video(1695, 555, "TutorialVideo").setScale(0.2);
    this.TutorialVideo.play();

    //Check when video stops
    var isPlaying = this.TutorialVideo.isPlaying();
    if (!isPlaying)
    {
      this.TutorialVideo.destroy();
    }

    this.dataStore = {"key": "Value"};
    return super.create(this.mapKey, false);
  }
  update()
  {
    return super.update('level1');
  }
}
