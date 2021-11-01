import { GameObjects, Scene } from 'phaser';

/**
 * Ground is an object (Rectangle) which positions itself at the given
 * elevation, extending to the width of the playable world.
 */
export class Ground extends GameObjects.Rectangle {
  body: Phaser.Physics.Arcade.Body;

  elevation: number;

  constructor(
    scene: Scene,
    opts: {
      elevation?: number;
      bg?: number;
      bgOpacity?: number;
    } = {}
  ) {
    const elevation = opts.elevation ?? 0;

    super(
      scene,
      scene.physics.world.bounds.centerX,
      Math.round(scene.physics.world.bounds.height - elevation),
      scene.physics.world.bounds.width,
      Math.max(10, Math.round(elevation)),
      opts.bg ?? 0x1a1b1c,
      opts.bgOpacity ?? 1.0
    );

    this.scene = scene;
    this.elevation = opts.elevation ?? 0;

    this.setOrigin(0.5, 0);

    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);

    this.body.setAllowGravity(false);
    this.body.setImmovable(true);
  }
}
