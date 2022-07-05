import { Action, Actor2D, SpriteTexture } from '@khanonjs/engine';
export declare class RobocilloActionChat extends Action<Actor2D, void> {
    static id: string;
    txChats: SpriteTexture[];
    txEnd: SpriteTexture[];
    counter: number;
    onPlay(): void;
    onStop(): void;
    setChastTextures(txChats: SpriteTexture[]): void;
}
