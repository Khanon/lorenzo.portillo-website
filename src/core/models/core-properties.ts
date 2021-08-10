export interface CoreProperties {
    /** Target FPS of the application */
    fps: number;
    /** Don't update before this delay */
    delayUpdate?: number;
    /** Don't return a 'delta' bigger than this */
    fpxMaxValue?: number;
}
