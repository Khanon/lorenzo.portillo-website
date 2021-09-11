import { Subject } from 'rxjs';

export class AnimationKeyFrame {
    /**
     * Id of the keyframes group
     */
    id: number;

    /**
     * Subject will emit on keyframe start passing as argument the frame number
     */
    subject: Subject<number>;

    /**
     * Frames numbers
     */
    keyFrames: number[];
}
