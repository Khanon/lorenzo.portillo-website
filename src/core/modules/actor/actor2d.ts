import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor } from '../actor/actor';
import { Sprite } from '../sprite/sprite';
import { ActorProperties } from './actor-properties';
import { ActorAnimation2D } from './actor-animation-2d';

export abstract class Actor2D extends Actor {
    protected _sprite: Sprite;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {
        super(name, properties);
    }

    get sprite(): Sprite {
        return this._sprite;
    }

    abstract createDisplayObject(babylonJsScene: BabylonJsScene): Sprite;

    protected setDisplayObject(displayObject: Sprite): void {
        this._sprite = displayObject;
    }

    setAnimation(name: string, loop: boolean = true, onDone?: () => void): void {
        const animation = this.animations.get<ActorAnimation2D>(name);
        this.sprite.play(animation.delay, loop, animation.frameStart, animation.frameEnd, onDone);
    }
}
