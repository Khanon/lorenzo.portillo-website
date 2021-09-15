import { Motion } from '../motion';
import { Sprite } from '../../sprite/sprite';
import { Observable } from 'rxjs';

export interface MotionSpriteBasicProperties {}

export class MotionSpriteBasic extends Motion<Sprite> {
    initialize(properties: MotionSpriteBasicProperties, onDone?: () => void): void {}

    onStart(): void {}

    onEnd(): void {}

    loopUpdate(delta: number): void {
        // this.subject.
    }
}
