import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { Actor2D, State } from '@khanonjs/engine';
export declare class SunStateMotion extends State<Actor2D> {
    static paramsRatio0Pos: Vector3;
    static paramsRatio1Pos: Vector3;
    static paramsRatio0Scale: number;
    static paramsRatio1Scale: number;
    static endPosition: Vector3;
    static endScale: number;
    onStart(): void;
    onEnd(): void;
    loopUpdate(delta: number): void;
}
