import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { Actor } from '../actor/actor';
import { Sprite } from '../sprite/sprite';
import { ActorProperties } from './actor-properties';

export abstract class Actor2D extends Actor {
    protected _sprite: Sprite;

    constructor(readonly name: string, protected readonly properties?: ActorProperties) {
        super(name, properties);
    }

    abstract createDisplayObject(babylonJsScene: BabylonJsScene): Sprite;
    abstract initialize(): void;

    protected setChildDisplayObject(displayObject: Sprite): void {
        this._sprite = displayObject;
    }

    get sprite(): Sprite {
        return this._sprite;
    }
}
