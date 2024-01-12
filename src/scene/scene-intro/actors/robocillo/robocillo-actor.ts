import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Scene as BabylonJsScene } from '@babylonjs/core/scene';
import {
    Actor2D,
    AssetsManager,
    ParticleEndCriteria,
    ParticleSprite,
    Sprite,
    SpriteTexture
} from '@khanonjs/engine';
import * as Misc from '@khanonjs/engine/misc';

import { SceneIntroGlobals } from '../../scene-intro-globals';
import { SceneIntroMessages } from '../../scene-intro-notifications';
import { RobocilloActionChat } from './robocillo-action-chat';
import { RobocilloActionGoTo } from './robocillo-action-goto';
import {
    RobocilloAnimations,
    RobocilloKeyFrames
} from './robocillo-animations';
import { RobocilloStateIntro } from './robocillo-state-intro';

export class RobocilloActor extends Actor2D {
    static paramsRatio0Pos = new Vector3(-20, 7, -140);
    static paramsRatio1Pos = new Vector3(-20, -48, -440);

    private loadingChatsTx: SpriteTexture[];
    private readonly loadingChats: string[][] = [
        ['Loading...'],
        ['Developing bugs...'],
        ['Mixing bits...'],
        ['Loading bytes...'],
        ['Generating errors...'],
        ['Shading shaders...'],
        ['Composing meshes...']
    ];

    private floorContactTexture: SpriteTexture;

    createDisplayObject(babylonJsScene: BabylonJsScene): Sprite {
        this.loadingChatsTx = Misc.SpriteTextures.createListFromTextBlock('', babylonJsScene, this.loadingChats, SceneIntroGlobals.fontBase_30);
        Misc.Arrays.shuffle(this.loadingChatsTx, 1);

        return new Sprite(this.name, { textureId: 'robocillo', numFrames: 32 });
    }

    onInitialize(assetsManager: AssetsManager): void {
        const actionChat = new RobocilloActionChat(RobocilloActionChat.id, this);
        actionChat.setChastTextures(this.loadingChatsTx);

        this.actions.registerAction(actionChat);
        this.actions.registerAction(new RobocilloActionGoTo(RobocilloActionGoTo.id, this));

        this.state.registerState(new RobocilloStateIntro(RobocilloStateIntro.id, this));

        this.addAnimation(RobocilloAnimations.STOP_SIDE, { delay: 75, frameStart: 0, frameEnd: 0, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_TAKE, { delay: 75, frameStart: 8, frameEnd: 15, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_CHECK, { delay: 75, frameStart: 16, frameEnd: 21, loop: false });
        this.addAnimation(RobocilloAnimations.PAPER_THROW, { delay: 75, frameStart: 24, frameEnd: 27, loop: false });
        this.addAnimation(RobocilloAnimations.SIDE_TO_FRONT, { delay: 75, frameStart: 32, frameEnd: 34, loop: false });
        this.addAnimation(RobocilloAnimations.FRONT_TO_SIDE, { delay: 75, frameStart: 40, frameEnd: 42, loop: false });
        this.addAnimation(RobocilloAnimations.STOP_FRONT, { delay: 75, frameStart: 48, frameEnd: 48, loop: false });
        this.addAnimation(RobocilloAnimations.WALK, {
            delay: 75,
            frameStart: 56,
            frameEnd: 63,
            loop: true,
            keyFrames: [
                {
                    id: RobocilloKeyFrames.FLOOR_CONTACT,
                    frames: [56, 60]
                }
            ]
        });
        this.addAnimation(RobocilloAnimations.MOVE_HANDS, { delay: 75, frameStart: 64, frameEnd: 66, loop: true });
        this.addAnimation(RobocilloAnimations.RAISE_HANDS, { delay: 75, frameStart: 72, frameEnd: 74, loop: true });
        this.addAnimation(RobocilloAnimations.JUMP_FRONT, { delay: 75, frameStart: 80, frameEnd: 85, loop: false });

        this.setScale(0.78);

        this.floorContactTexture = assetsManager.getSpriteTexture({ id: 'particle-walk-dust' });
        this.keyFrameSubject(RobocilloKeyFrames.FLOOR_CONTACT).subscribe(() => this.particleDust());
    }

    onRelease(): void {
        Misc.SpriteTextures.releaseList(this.loadingChatsTx);
    }

    notify(id: SceneIntroMessages): void {
        switch (id) {
        case SceneIntroMessages.WORLD_LOADED:
            this.state.notify(id);
            break;
        case SceneIntroMessages.GRAVITY_FLOOR_CONTACT:
            this.particleDust();
            break;
        }
    }

    particleDust(): void {
        this.particles.new(
            new ParticleSprite({
                spriteTexture: this.floorContactTexture,
                spriteAnimation: { delay: 150, loop: false, frameStart: 0, frameEnd: 3 },
                x: this.getX(),
                y: this.getY(),
                z: this.getZ() - 0.6,
                scale: this.getScale(),
                alpha: Math.random() / 2 + 0.1,
                endCriteria: ParticleEndCriteria.ANIMATION_END
            })
        );
    }
}
