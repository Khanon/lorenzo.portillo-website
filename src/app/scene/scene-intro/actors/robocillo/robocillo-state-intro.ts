import { Actor2D, Misc, State } from '../../../../../core';

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

    private readonly ANGLE_SUN = -0.21;
    private readonly ANGLE_CENTER = 0;

    private gameLoaded: boolean = false; // 8a8f eliminar

    start(): void {
        this.goIn();
    }

    end(): void {}

    goIn(): void {
        this.target.action.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_SUN }, () => setTimeout(() => this.stopSun(), 500));
    }

    stopSun(): void {
        this.target.setAnimation(RobocilloAnimations.SIDE_TO_FRONT, false);
        setTimeout(() => this.target.setAnimation(RobocilloAnimations.MOVE_HANDS, true), 500);
        setTimeout(() => this.target.setAnimation(RobocilloAnimations.STOP_FRONT, false), 1000);
        setTimeout(() => this.goCenter(), 1500);
    }

    goCenter(): void {
        this.target.action.play<IRobocilloActionGoTo>(RobocilloActionGoTo.id, { angle: this.ANGLE_CENTER }, () => setTimeout(() => this.stopCenter(), 100));
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
                this.centerEnd(Happiness.JUMP);
            });
        } else {
            setTimeout(() => this.target.setAnimation(RobocilloAnimations.PAPER_CHECK, false, () => this.checkPaper()), 500 + Math.random() * 1000);
        }
    }

    centerEnd(happiness?: Happiness): void {
        switch (happiness ?? Misc.Maths.randomInt(Happiness.MOVE_HANDS, Happiness.JUMP)) {
            case Happiness.MOVE_HANDS:
                this.target.setAnimation(RobocilloAnimations.MOVE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case Happiness.RAISE_HANDS:
                this.target.setAnimation(RobocilloAnimations.RAISE_HANDS);
                setTimeout(() => this.centerEnd(), 500 + Math.random() * 1000);
                break;
            case Happiness.JUMP:
                const vJump = SceneIntroShared.earth.getPosition().subtract(this.target.getPosition()).negate().normalize().scale(0.02);
                this.target.setAnimation(RobocilloAnimations.JUMP_FRONT, false);
                setTimeout(() => this.target.physics.applyForce(vJump), 200);
                setTimeout(() => this.centerEnd(), 1200);
                break;
        }
    }
}
