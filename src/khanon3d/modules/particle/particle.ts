import { Observable } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { LoopUpdateable } from '../../models/loop-updateable';
import { DisplayObject } from '../../models/display-object';
import { ParticleProperties } from './particle-properties';
import { Logger } from '../logger/logger';

export abstract class Particle extends LoopUpdateable {
    abstract name: string;
    protected displayObject: DisplayObject;

    constructor(protected readonly properties: ParticleProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    setDisplayObject(displayObject: DisplayObject): void {
        this.displayObject = displayObject;
    }

    start(): void {
        if (!this.displayObject) {
            Logger.error('No displayObject defined for particle -', this.name);
        } else {
            this.subscribeLoopUpdate();
            this.onStart();
        }
    }

    end(): void {
        this.unSubscribeLoopUpdate();
        this.onEnd();
    }

    abstract initialize(scene: BabylonJsScene): void;
    abstract onStart(): void;
    abstract onEnd(): void;

    loopUpdate(delta: number): void {
        // 8a8f
    }
}
