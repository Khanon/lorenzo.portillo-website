import { Scene as SceneasBabylonJsScene } from '@babylonjs/core/scene';

import { Actor } from './actor';

export class ActorsManager {
    private readonly _actors: Actor[] = [];

    get actors(): Actor[] {
        return this._actors;
    }

    addActor(actor: Actor): any {
        this._actors.push(actor);
        return actor;
    }

    removeActor(): void {
        // TODO
    }

    release(): void {
        // TODO
    }
}
