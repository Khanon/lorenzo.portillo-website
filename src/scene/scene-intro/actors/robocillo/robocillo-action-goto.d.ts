import { Action, Actor2D } from '@khanonjs/engine';
export interface IRobocilloActionGoTo {
    angle: number;
}
export declare class RobocilloActionGoTo extends Action<Actor2D, IRobocilloActionGoTo> {
    static id: string;
    private vDirection;
    private gotoAngle;
    private prevDistance;
    onPlay(): void;
    onStop(): void;
    getEarthAngle(): number;
    loopUpdate(delta: number): void;
}
