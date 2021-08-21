import { Actor2D, Misc, State } from '../../../../../core';

import { IRobocilloActionGoTo, RobocilloActionGoTo } from './robocillo-action-goto';
import { RobocilloAnimations } from './robocillo-animations';
import { SceneIntroShared } from './../../scene-intro-shared';

export class RobocilloStateIntro extends State<Actor2D> {
    static id: string = 'RobocilloStateIntro';

    private readonly ANGLE_FIRST_STOP = -0.217;
    private readonly ANGLE_LAST_STOP = 0;

    private gameLoaded: boolean = false; // 8a8f eliminar

    start(): void {
        this.goIn();
    }

    end(): void {}

    goIn(): void {
        this.target.action.play<IRobocilloActionGoTo>(
            RobocilloActionGoTo.id,
            {
                angle: this.ANGLE_FIRST_STOP,
            },
            () => {
                this.target.physics.scaleVelocity(0.5);
                this.target.setAnimation(RobocilloAnimations.STOP_SIDE, false);
                setTimeout(() => this.stopSun(), 500);
            }
        );
    }

    stopSun(): void {
        this.target.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        setTimeout(() => this.target.setAnimation(RobocilloAnimations.MOVE_HANDS, true), 500);
        setTimeout(() => this.target.setAnimation(RobocilloAnimations.STOP_FRONT, false), 1000);
        setTimeout(() => this.goCenter(), 1500);
    }

    goCenter(): void {
        this.target.action.play<IRobocilloActionGoTo>(
            RobocilloActionGoTo.id,
            {
                angle: this.ANGLE_LAST_STOP,
            },
            () => {
                this.target.physics.scaleVelocity(0.5);
                this.target.setAnimation(RobocilloAnimations.STOP_SIDE, false);
                setTimeout(() => this.stopCenter(), 100);
            }
        );
    }

    stopCenter(): void {
        this.target.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        setTimeout(() => this.target.setAnimation(RobocilloAnimations.PAPER_TAKE, false), 500);
        setTimeout(() => this.checkPaper(), 500);
        setTimeout(() => (this.gameLoaded = true), 2500); // 8a8f eliminar
    }

    checkPaper(): void {
        if (this.gameLoaded) {
            this.target.setAnimation(RobocilloAnimations.PAPER_THROW, false, () => {
                this.centerEnd();
            });
        } else {
            setTimeout(() => this.target.setAnimation(RobocilloAnimations.PAPER_CHECK, false, () => this.checkPaper()), 500 + Math.random() * 1000);
        }
    }

    centerEnd(): void {
        switch (Misc.Maths.randomInt(0, 2)) {
            case 0:
                this.target.setAnimation(RobocilloAnimations.MOVE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case 1:
                this.target.setAnimation(RobocilloAnimations.RAISE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case 2:
                const vJump = SceneIntroShared.earth.getPosition().subtract(this.target.getPosition()).negate().normalize().scale(0.02);
                this.target.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
                setTimeout(() => this.target.physics.applyForce(vJump), 200);
                setTimeout(() => this.centerEnd(), 1200);
                break;
        }
    }
}
