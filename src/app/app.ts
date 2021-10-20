import { Core } from '../khanon3d';

import { SceneIntro } from './scene/scene-intro/scene-intro';
import { SceneWorld } from './scene/scene-world/scene-world';
import { AppNotifications } from './app.notifications';
import { StateMachine } from '../khanon3d/modules/state-machine/state-machine';

class App {
    core: Core;
    blackScrenn: HTMLElement;
    canvasContainer: HTMLElement;

    // States
    state: StateMachine = new StateMachine();

    // Scenes
    sceneIntro: SceneIntro;
    sceneWorld: SceneWorld;

    constructor() {
        this.init();
    }

    init(): void {
        this.blackScrenn = document.getElementById('blackscreen-container');
        this.canvasContainer = document.getElementById('canvas-container');

        // Initialize app
        // TODO: remve FPS after development
        this.core = new Core({
            fps: 60,
            onAppError: (errorMsg) => this.appError(errorMsg),
            isDevelopmentMode: this.isDevelopmentMode(),
            fpsContainer: 'fps-container',
        });
        this.core.createCanvasOnDivElement(this.canvasContainer);
        this.core.run(() => {
            this.sceneIntro = new SceneIntro({
                assetsJsonUrl: './assets/scene-intro/assets.json',
                clearColor: { a: 1.0, r: 0.25, g: 0.25, b: 0.25 },
                playOnLoad: true,
                appNotification: (msg: AppNotifications) => this.notify(msg),
            });
            this.sceneWorld = new SceneWorld({
                assetsJsonUrl: './assets/scene-world/assets.json',
                clearColor: { a: 1.0, r: 1, g: 0, b: 0 },
            });

            this.core.loadScene(this.sceneIntro);
            this.core.loadScene(this.sceneWorld, (sceneWorld) => this.sceneIntro.onWorldLoaded$.next());
        });
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

    hideBlackScreen(): void {
        this.blackScrenn.style.display = 'none';
    }

    goWorld(): void {
        this.sceneIntro.stop();
        this.sceneIntro.release();
        this.sceneWorld.play();
    }

    notify(msg: AppNotifications): void {
        switch (msg) {
            case AppNotifications.HIDE_BLACK_SCREEN:
                this.hideBlackScreen();
                break;
            case AppNotifications.GO_WORLD:
                this.goWorld();
                break;
        }
    }
}
new App();
