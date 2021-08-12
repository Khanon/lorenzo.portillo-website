/**
 * Modifiers are meant to add functionalities or modify properties of Actors or Scenes.
 * Modifeiers can be used from outer the container and also be combined with other modifiers.
 */

import { Misc } from '../misc/misc';
import { Modifier } from './modifier';
import { Logger } from '../logger/logger';

export class Modifiers {
    private readonly modifiers: Misc.KeyValue<string, Modifier> = new Misc.KeyValue<string, Modifier>();

    add(modifier: Modifier): Modifier {
        if (this.modifiers.get(modifier.id)) {
            Logger.warn(`Can't add modifier, Id already exists: ${modifier.id}`);
            return undefined;
        }
        this.modifiers.add(modifier.id, modifier);
        return modifier;
    }

    get(modifierId: string): any {
        const modifier = this.modifiers.get(modifierId);
        if (!modifier) {
            Logger.error('Modifier not found:', modifierId);
            return undefined;
        }
        return modifier;
    }
}
