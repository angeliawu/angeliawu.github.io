export default loadAnims

function loadAnims(that){
  that.anims.create({
      key: "walk",
      frames: that.anims.generateFrameNumbers('Potato', { start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
    });
  that.anims.create({
      key: 'idle',
      frames: that.anims.generateFrameNumbers('Potato', { start: 0, end: 0}),
      frameRate: 4,
      repeat: -1
  });
  that.anims.create({
      key: 'cook_idle',
      frames: that.anims.generateFrameNumbers('cookIdle', {start:0, end:9}),
      frameRate: 5,
      repeat: -1
  });
  that.anims.create({
      key: "cook_walk_right",
      frames: that.anims.generateFrameNumbers('cookIdle', { start: 0, end: 2}),
      frameRate: 5,
      repeat: 1
    });
    that.anims.create({
        key: "cook_Cont_right",
        frames: that.anims.generateFrameNumbers('Cookwalk', { start: 0, end: 6}),
        frameRate: 20,
        repeat: -1
      });
    that.anims.create({
        key: "cook_walk_up",
        frames: that.anims.generateFrameNumbers('CookAway', { start: 0, end: 5}),
        frameRate: 5,
        repeat: -1
      });
    that.anims.create({
        key: "cook_face_right",
        frames: that.anims.generateFrameNumbers('Cookwalk', { start: 7, end: 13}),
        frameRate: 5,
        repeat: 1
      });
  that.anims.create({
      key: 'onion_pushed',
      frames: that.anims.generateFrameNumbers('onion', { start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
  });
  that.anims.create({
      key: 'onion_idle',
      frames: that.anims.generateFrameNumbers('onion', { start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
  });
  that.anims.create({
      key: 'tomato_pushed',
      frames: that.anims.generateFrameNumbers('tomato', { start: 0, end: 5}),
      frameRate: 10,
      repeat: -1
  });
  that.anims.create({
      key: 'tomato_idle',
      frames: that.anims.generateFrameNumbers('tomato', { start: 0, end: 0}),
      frameRate: 10,
      repeat: -1
  });
  that.anims.create({
      key: 'door_open',
      frames: that.anims.generateFrameNumbers('door', { start: 0, end: 3}),
      frameRate: 10,
      repeat: 0
  });
  that.anims.create({
    key: 'angry_chase',
    frames: that.anims.generateFrameNumbers('Angry', {start:10, end:16}),
    frameRate: 5,
    repeat: -1
  })
  that.anims.create({
    key: 'angry_idle',
    frames: that.anims.generateFrameNumbers('Angry', {start:0, end:9}),
    frameRate: 5,
    repeat: -1
  })
  that.anims.create({
    key: 'angry_away',
    frames: that.anims.generateFrameNumbers('Angry', {frames:[27,28,29,37,38,39]}),
    frameRate: 5,
    repeat: -1
  })
}
