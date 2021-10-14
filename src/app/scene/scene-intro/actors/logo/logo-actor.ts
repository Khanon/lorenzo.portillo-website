import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor2D, Sprite } from '../../../../../khanon3d';

import { LogoStateMotion } from './logo-state-motion';

export class LogoActor extends Actor2D {
    static paramsRatio0Pos = new Vector3(0, 136, -2);
    static paramsRatio1Pos = new Vector3(0, 115, 240);
    static paramsRatio0Scale = 0.35;
    static paramsRatio1Scale = 0.4;

    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        return new Sprite(this.name, { textureId: 'logo', numFrames: 90 });
    }

    initialize(): void {
        this.state.registerState(new LogoStateMotion('motion', this));
    }

    onRelease(): void {}
}
