export interface SpriteKeyFrameCallback {
    /**
     * Callback will be invoked from Sprite class passing as argument the frame number
     */
    callback: (frame: number) => void;

    /**
     * Frames numbers
     */
    keyframes: number[];
}
