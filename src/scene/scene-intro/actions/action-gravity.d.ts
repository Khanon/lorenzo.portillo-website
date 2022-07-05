import { Action, Actor } from '@khanonjs/engine';
export declare class SceneIntroActionGravity extends Action<Actor, void> {
    private readonly GRAVITY_POWER;
    private readonly HORIZONTAL_DECREASE_FACTOR;
    private readonly RESTITUTION_OVER_FACTOR;
    private floorLength;
    private readonly actors;
    onPlay(): void;
    onStop(): void;
    addActor(actor: Actor): void;
    loopUpdate(delta: number): void;
}
