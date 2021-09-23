import { Actor2D, State } from '../../../../../khanon3d';
import * as Misc from '../../../../../khanon3d/modules/misc';

import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { RobocilloAnimations } from './robocillo-animations';
import { SceneIntroShared } from './../../scene-intro-shared';

enum Happiness {
    MOVE_HANDS,
    RAISE_HANDS,
    JUMP,
}

export class RobocilloStateIntro extends State<Actor2D> {
    static id: string = 'RobocilloStateIntro';

    private readonly ANGLE_SUN = -0.1745;
    private readonly ANGLE_CENTER = 0;

    private robocillo: Actor2D;

    private gameLoaded: boolean = false; // TODO:  eliminar

    start(): void {
        this.robocillo = this.subject;
        this.goIn();
    }

    end(): void {}

    goIn(): void {
        this.robocillo.action.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_SUN }, () => setTimeout(() => this.stopSun(), 500));
    }

    stopSun(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS, true), 500);
        setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.STOP_FRONT, false), 1000);
        setTimeout(() => this.goCenter(), 1500);
    }

    goCenter(): void {
        this.robocillo.action.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_CENTER }, () => setTimeout(() => this.stopCenter(), 100));
    }

    stopCenter(): void {
        this.robocillo.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.PAPER_TAKE, false), 500);
        setTimeout(() => this.checkPaper(), 500);
        setTimeout(() => (this.gameLoaded = true), 2500); // TODO: eliminar
    }

    checkPaper(): void {
        if (this.gameLoaded) {
            this.robocillo.setAnimation(RobocilloAnimations.PAPER_THROW, false, () => {
                this.centerEnd(Happiness.JUMP);
            });
        } else {
            setTimeout(() => this.robocillo.setAnimation(RobocilloAnimations.PAPER_CHECK, false, () => this.checkPaper()), 500 + Math.random() * 1000);
        }
    }

    centerEnd(happiness?: Happiness): void {
        switch (happiness ?? Misc.Maths.randomInt(Happiness.MOVE_HANDS, Happiness.JUMP)) {
            case Happiness.MOVE_HANDS:
                this.robocillo.setAnimation(RobocilloAnimations.MOVE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case Happiness.RAISE_HANDS:
                this.robocillo.setAnimation(RobocilloAnimations.RAISE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case Happiness.JUMP:
                if (this.robocillo.physics.onFloor) {
                    const vJump = SceneIntroShared.earth.getPosition().subtract(this.robocillo.getPosition()).negate().normalize().scale(10);
                    this.robocillo.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
                    this.robocillo.physics.resetVelocity();
                    setTimeout(() => this.robocillo.physics.applyForce(vJump), 200);
                }
                setTimeout(() => this.centerEnd(), 1200);
                break;
        }
    }
}
