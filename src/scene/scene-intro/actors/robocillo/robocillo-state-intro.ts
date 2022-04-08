import { Actor2D, State, WorkerTimer } from '@khanonjs/engine';
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

    static readonly paramRatio0AngleSun = -0.055;
    static readonly paramRatio1AngleSun = -0.183;
    static ANGLE_SUN = 0;
    private readonly ANGLE_CENTER = -0.004;

    private robocillo: Actor2D;

    private loading: boolean;
    private loadingSteps: number;
    private timeout: number;

    onStart(): void {
        this.loading = true;
        this.loadingSteps = 0;
        this.robocillo = this.subject;
        this.goIn();
    }

    onEnd(): void {
        WorkerTimer.clearAllOnContext(this);
    }

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
            () => (this.timeout = WorkerTimer.setTimeout(() => this.stopSun(), 500, this))
        );
    }

    stopSun(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        WorkerTimer.setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS, true), 500, this);
        WorkerTimer.setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.STOP_FRONT, false), 1000, this);
        WorkerTimer.setTimeout(() => this.goCenter(), 1500, this);
    }

    goCenter(): void {
        this.robocillo.actions.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_CENTER }, () =>
            WorkerTimer.setTimeout(() => this.stopCenter(), 100, this)
        );
    }

    stopCenter(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        WorkerTimer.setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.PAPER_TAKE, false), 500, this);
        WorkerTimer.setTimeout(() => this.checkPaper(), 500, this);
    }

    checkPaper(): void {
        if (this.loading || this.loadingSteps < 3) {
            WorkerTimer.setTimeout(
                () =>
                    this.robocillo.setAnimation(RobocilloAnimations.PAPER_CHECK, false, () => {
                        this.checkPaper();
                        this.robocillo.actions.play(RobocilloActionChat.id);
                    }),
                500 + Math.random() * 1000,
                this
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
            WorkerTimer.setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000, this);
            break;
        case Happiness.RAISE_HANDS:
            this.robocillo.setAnimation(RobocilloAnimations.RAISE_HANDS);
            WorkerTimer.setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000, this);
            break;
        case Happiness.JUMP:
            if (this.robocillo.physics.onFloor) {
                const vJump = SceneIntroGlobals.earth.getPosition().subtract(this.robocillo.getPosition()).negate().normalize().scale(10);
                this.robocillo.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
                this.robocillo.physics.resetVelocity();
                WorkerTimer.setTimeout(() => this.robocillo.physics.applyForce(vJump), 200, this);
            }
            WorkerTimer.setTimeout(() => this.centerEnd(), 1200, this);
            break;
        }
    }
}
