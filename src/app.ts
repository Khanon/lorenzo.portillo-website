import { Core } from './khanon3d';

import { SceneIntro } from './app/scene/scene-intro/scene-intro';

class App {
    core: Core;
    // readonly states: StateMachine = new StateMachine();

    constructor() {
        setTimeout(() => {
            this.init();
        }, 1);
    }

    init(): void {
        // Initialize app
        this.core = new Core({ fps: 60, deltaMaxValue: 1000 / 60 / 60 });
        this.core.createCanvasOnDivElement('canvas-container');
        this.core.start();

        this.core.setScene(new SceneIntro(), {
            assetsJsonUrl: './assets/scene-intro/assets.json',
            isDevelopmentMode: this.isDevelopmentMode(),
            fpsContainer: 'fps-container',
        }); // TODO: remve FPS after development
        // this.states.GoTo(new StateLoading(this.scene));
    }

    isDevelopmentMode(): boolean {
        return process.env.NODE_ENV === 'development';
    }
}
new App();
