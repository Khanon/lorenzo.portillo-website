import { Actor2D, State } from '@khanonjs/engine';
import { SceneIntroMessages } from '../../scene-intro-notifications';
declare enum Happiness {
    MOVE_HANDS = 0,
    RAISE_HANDS = 1,
    JUMP = 2
}
export declare class RobocilloStateIntro extends State<Actor2D> {
    static id: string;
    static readonly paramRatio0AngleSun = -0.055;
    static readonly paramRatio1AngleSun = -0.183;
    static ANGLE_SUN: number;
    private readonly ANGLE_CENTER;
    private robocillo;
    private loading;
    private loadingSteps;
    private timeout;
    onStart(): void;
    onEnd(): void;
    notify(id: SceneIntroMessages): void;
    goIn(): void;
    stopSun(): void;
    goCenter(): void;
    stopCenter(): void;
    checkPaper(): void;
    centerEnd(happiness?: Happiness): void;
}
export {};
