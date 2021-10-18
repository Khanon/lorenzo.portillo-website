import { SceneProperties } from '../../khanon3d/modules/scene/scene-properties';

import { AppNotifications } from '../app.notifications';

export interface AppSceneProperties extends SceneProperties {
    appNotification?: (msg: AppNotifications) => void;
}
