import { Observable } from 'rxjs';

import { Scene as BabylonJsScene } from '@babylonjs/core/scene';

import { ParticleProperties } from './particle-properties';
import { LoopUpdateable } from '../../models/loop-updateable';
import { Motion } from '../motion/motion';
import { SpritesManager } from '../sprite/sprites-manager';
import { MeshesManager } from '../mesh/meshes-manager';
import { Sprite } from '../sprite/sprite';
import { Mesh } from '../mesh/mesh';
import { DisplayObject } from '../../models/display-object';

export abstract class Particle<T = Sprite | Mesh> extends LoopUpdateable {
    abstract id: string;

    protected parent: DisplayObject;
    protected abstract motion: Motion;

    protected babylonJsScene: BabylonJsScene;
    protected spritesManager: SpritesManager;
    protected meshesManager: MeshesManager;

    protected displayObject: T;

    constructor(protected readonly properties: ParticleProperties, protected readonly loopUpdate$?: Observable<number>) {
        super(loopUpdate$);
    }

    initialize(babylonJsScene: BabylonJsScene, spritesManager: SpritesManager, meshesManager: MeshesManager, parent?: DisplayObject): void {
        this.babylonJsScene = babylonJsScene;
        this.spritesManager = spritesManager;
        this.meshesManager = meshesManager;
        this.parent = parent;
        this.onInitialize();
    }

    setDisplayObject(displayObject: T): void {
        this.displayObject = displayObject;
    }

    start(): void {
        this.motion?.start();
        this.onStart();
    }

    end(): void {
        this.motion?.end();
        this.onEnd();
    }

    loopUpdate(delta: number): void {}

    /**
     * Initialize displayObject and motion if needed on child method
     *
     * @param scene
     */
    abstract onInitialize(): void;

    /**
     * Start and End child functions
     */
    abstract onStart(): void;
    abstract onEnd(): void;
}
