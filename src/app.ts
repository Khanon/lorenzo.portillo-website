import { Core, WorkerTimer } from './khanon3d';

import { SceneIntro } from './app/scene/scene-intro/scene-intro';
import { SceneWorld } from './app/scene/scene-world/scene-world';

class App {
    core: Core;

    constructor() {
        // Avoid babylonJs canvas scale error
        WorkerTimer.setTimeout(this.init, 1, this);
    }

    init(): void {
        // Initialize app
        // TODO: remve FPS after development
        this.core = new Core({
            fps: 60,
            onAppError: (errorMsg) => this.appError(errorMsg),
            isDevelopmentMode: this.isDevelopmentMode(),
            fpsContainer: 'fps-container',
        });
        this.core.createCanvasOnDivElement('canvas-container');
        this.core.start();

        const sceneIntro = this.core.addScene(new SceneIntro({ assetsJsonUrl: './assets/scene-intro/assets.json', playOnLoad: true }));
        const sceneWorld = this.core.addScene(new SceneWorld({ assetsJsonUrl: './assets/scene-world/assets.json' }));
        sceneIntro.load();
        // sceneWorld.load();
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
