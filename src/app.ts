import { Core } from './core/core';
import { SceneIntro } from './app/scene/scene-intro/scene-intro';

class App {
    core: Core;
    // readonly states: StateMachine = new StateMachine();

    constructor() {
        setTimeout(() => {
            this.init();
        }, 1);
    }

    /**
     * Initialize app
     */
    init(): void {
        // Initialize app
        this.core = new Core({ fps: 60, deltaMaxValue: 1 });
        this.core.createCanvasOnDivElement('canvas-container');
        this.core.start();

        this.core.setScene(new SceneIntro(), { isDevelopmentMode: this.isDevelopmentMode(), fpsContainer: 'fps-container' }); // 8a8f remve FPS after development
        // this.states.GoTo(new StateLoading(this.scene));
    }

    /**
     * Returns tru on environment development mode
     * @returns
     */
    isDevelopmentMode(): boolean {
        return process.env.NODE_ENV === 'development';
    }
}
new App();
