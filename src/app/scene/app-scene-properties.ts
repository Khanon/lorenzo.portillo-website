import { SceneProperties } from '@khanonjs/engine';

import { AppNotifications } from '../app.notifications';

export interface AppSceneProperties extends SceneProperties {
    appNotification?: (msg: AppNotifications) => void;
}
