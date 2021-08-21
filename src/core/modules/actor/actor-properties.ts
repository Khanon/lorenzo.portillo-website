import { Observable } from 'rxjs';

export interface ActorProperties {
    loopUpdate$?: Observable<number>;
    usePhysics?: boolean;
}
