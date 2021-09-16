import { Observable } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { ParticleProperties } from './particle-properties';
import { LoopUpdateable } from '../../models/loop-updateable';
import { Motion } from '../motion/motion';
import { SpritesManager } from '../sprite/sprites-manager';
import { MeshesManager } from '../mesh/meshes-manager';
import { DisplayObject } from '../../models/display-object';

export abstract class Particle extends LoopUpdateable {
    abstract id: string;

    protected parent: DisplayObject;
    protected abstract motion: Motion;

    protected babylonJsScene: BabylonJsScene;
    protected spritesManager: SpritesManager;
    protected meshesManager: MeshesManager;

    protected displayObject: DisplayObject;

    constructor(protected readonly properties: ParticleProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    /**
     * Return DisplayObject from child particle
     */
    abstract getDisplayObject(): DisplayObject;

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

    initialize(babylonJsScene: BabylonJsScene, spritesManager: SpritesManager, meshesManager: MeshesManager, parent?: DisplayObject): void {
        this.babylonJsScene = babylonJsScene;
        this.spritesManager = spritesManager;
        this.meshesManager = meshesManager;
        this.parent = parent;

        this.displayObject = this.getDisplayObject();
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
