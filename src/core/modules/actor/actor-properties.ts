import { Observable } from 'rxjs';

export interface ActorProperties {
    loopUpdate$?: Observable<number>;
    physicsUpdate$?: Observable<number>;
    usePhysics?: boolean;
}
