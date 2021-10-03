export interface CoreProperties {
    /** Target FPS of the application */
    fps: number;
    /** Don't update before this delay */
    delayUpdate?: number;
    /** Critical error app callback */
    onAppError?: (errorMsg: string) => void;
}
