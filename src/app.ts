import { AssetsManager, Engine, Scene } from './core';
import { StateLoading } from './app/index';
import { Core } from './core/core';
import { SceneIntro } from './app/scene/scene-loading';

class App {
    readonly core: Core;
    // readonly states: StateMachine = new StateMachine();

    constructor() {
        // Initialize app
        this.core = new Core();
        this.core.createCanvasOnDivElement('canvas-container');
        this.core.start();

        this.init();
    }

    /**
     * Initialize app
     */
    init(): void {
        this.core.setScene(new SceneIntro(), this.isDevelopmentMode());
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
