import { Observable } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { ParticleProperties } from './particle-properties';
import { LoopUpdateable } from '../../models/loop-updateable';
import { Motion } from '../motion/motion';
import { MeshesManager } from '../mesh/meshes-manager';
import { DisplayObject } from '../../models/display-object';
import { AssetsManager } from '../assets-manager/assets-manager';

export abstract class Particle extends LoopUpdateable {
    abstract id: string;

    protected parent: DisplayObject;
    protected abstract motion: Motion;

    protected babylonJsScene: BabylonJsScene;
    protected assetsManager: AssetsManager;
    protected meshesManager: MeshesManager;

    protected displayObject: DisplayObject;

    constructor(protected readonly properties: ParticleProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    /**
     * Return DisplayObject from child particle
     */
    abstract createDisplayObject(): DisplayObject;

    /**
     * Initialize displayObject and motion if needed on child function
     *
     * @param scene
     */
    abstract onInitialize(): void;

    /**
     * Start and End child functions
     */
    abstract onStart(): void;
    abstract onEnd(): void;

    initialize(babylonJsScene: BabylonJsScene, assetsManager: AssetsManager, parent?: DisplayObject): void {
        this.babylonJsScene = babylonJsScene;
        this.assetsManager = assetsManager;
        this.parent = parent;

        this.displayObject = this.createDisplayObject();
        this.displayObject.setX(this.properties.x);
        this.displayObject.setY(this.properties.y);
        this.displayObject.setZ(this.properties.z);
        this.displayObject.setScale(this.properties.scale);
        this.displayObject.setAlpha(this.properties.alpha);

        this.onInitialize();
    }

    start(): void {
        this.motion?.start();
        this.onStart();
    }

    end(): void {
        this.motion?.end();
        this.onEnd();
    }
}
