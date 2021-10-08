import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';

import { Actor2D, Sprite } from '../../../../../khanon3d';

import { SunStateMotion } from './sun-state-motion';

export class SunActor extends Actor2D {
    static paramsRatio0Pos = new Vector3(0, 280, -237);
    static paramsRatio1Pos = new Vector3(0, 280, -500);
    static paramsRatio0Scale = 0.35;
    static paramsRatio1Scale = 0.4;

    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        return new Sprite(this.name, { url: './assets/scene-intro/sprites/sun.png', numFrames: 1 });
    }

    initialize(): void {
        this.state.registerState(new SunStateMotion('motion', this));
        this.sprite.setFrame(0);
    }

    onRelease(): void {}
}
