import { Core, WorkerTimer } from './khanon3d';

import { SceneIntro } from './app/scene/scene-intro/scene-intro';

class App {
    core: Core;
    // readonly states: StateMachine = new StateMachine();

    constructor() {
        WorkerTimer.setTimeout(
            () => {
                this.init();
            },
            1,
            this
        );
    }

    init(): void {
        // Initialize app
        this.core = new Core({ fps: 60, onAppError: this.appError });
        this.core.createCanvasOnDivElement('canvas-container');
        this.core.start();

        this.core.setScene(new SceneIntro(), {
            assetsJsonUrl: './assets/scene-intro/assets.json',
            isDevelopmentMode: this.isDevelopmentMode(),
            fpsContainer: 'fps-container',
        }); // TODO: remve FPS after development
        // this.states.GoTo(new StateLoading(this.scene));
    }

    appError(errorMsg: string): void {
        const canvas = document.getElementById('canvas-container');
        const errorContainer = document.getElementById('error-container');
        const errorContainerMsg = document.getElementById('error-container-message');

        canvas.style.display = 'none';
        errorContainer.style.display = 'flex';
        errorContainerMsg.textContent = errorMsg;
    }

    isDevelopmentMode(): boolean {
        return process.env.NODE_ENV === 'development';
    }
}
new App();
