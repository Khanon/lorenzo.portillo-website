import { Actor2D, State } from '@khanonjs/engine';
import * as Misc from '@khanonjs/engine/misc';

import { SceneIntroGlobals } from '../../scene-intro-globals';
import { SceneIntroMessages } from '../../scene-intro-notifications';
import { RobocilloActionChat } from './robocillo-action-chat';
import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { RobocilloAnimations } from './robocillo-animations';

enum Happiness {
    MOVE_HANDS,
    RAISE_HANDS,
    JUMP,
}

export class RobocilloStateIntro extends State<Actor2D> {
    static id: string = 'RobocilloStateIntro';

    static readonly paramRatio0AngleSun = -0.062;
    static readonly paramRatio1AngleSun = -0.19;
    static ANGLE_SUN = 0;
    private readonly ANGLE_CENTER = -0.01;

    private robocillo: Actor2D;

    private loading: boolean;
    private loadingSteps: number;

    onStart(): void {
        this.loading = true;
        this.loadingSteps = 0;
        this.robocillo = this.subject;
        this.goIn();
    }

    onEnd(): void {}

    notify(id: SceneIntroMessages): void {
        switch (id) {
        case SceneIntroMessages.WORLD_LOADED:
            this.loading = false;
            break;
        }
    }

    goIn(): void {
        this.robocillo.actions.play<IRobocilloActionGoTo>(
            RobocilloActionGoTo.id,
            { angle: RobocilloStateIntro.ANGLE_SUN },
            () => this.addTimeout(() => this.stopSun(), 500)
        );
    }

    stopSun(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        this.addTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS, true), 500);
        this.addTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.STOP_FRONT, false), 1000);
        this.addTimeout(() => this.goCenter(), 1500);
    }

    goCenter(): void {
        this.robocillo.actions.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_CENTER }, () =>
            this.addTimeout(() => this.stopCenter(), 100)
        );
    }

    stopCenter(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        this.addTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.PAPER_TAKE, false), 500);
        this.addTimeout(() => this.checkPaper(), 500);
    }

    checkPaper(): void {
        if (this.loading || this.loadingSteps < 3) {
            this.addTimeout(
                () =>
                    this.robocillo.setAnimation(RobocilloAnimations.PAPER_CHECK, false, () => {
                        this.checkPaper();
                        this.robocillo.actions.play(RobocilloActionChat.id);
                    }),
                500 + Math.random() * 1000
            );
            this.loadingSteps++;
        } else {
            this.robocillo.setAnimation(RobocilloAnimations.PAPER_THROW, false, () => {
                this.centerEnd(Happiness.JUMP);
            });
        }
    }

    centerEnd(happiness?: Happiness): void {
        switch (happiness ?? Misc.Maths.randomInt(Happiness.MOVE_HANDS, Happiness.JUMP)) {
        case Happiness.MOVE_HANDS:
            this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS);
            this.addTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
            break;
        case Happiness.RAISE_HANDS:
            this.robocillo.setAnimation(RobocilloAnimations.RAISE_HANDS);
            this.addTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
            break;
        case Happiness.JUMP:
            if (this.robocillo.physics.onFloor) {
                const vJump = SceneIntroGlobals.earth.getPosition().subtract(this.robocillo.getPosition()).negate().normalize().scale(5);
                this.robocillo.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
                this.robocillo.physics.resetVelocity();
                this.addTimeout(() => this.robocillo.physics.applyForce(vJump), 200);
            }
            this.addTimeout(() => this.centerEnd(), 1200);
            break;
        }
    }
}
