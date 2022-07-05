import { Actor3D, State } from '@khanonjs/engine';
export declare class EarthStateMotion extends State<Actor3D> {
    private readonly endMotion;
    onStart(): void;
    onEnd(): void;
    loopUpdate(delta: number): void;
}
