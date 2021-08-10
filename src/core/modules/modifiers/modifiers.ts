/**
 * Modifiers are meant to add functionalities to Actor, Scenarios or whatever.
 * Adding a modifier will add a class that belongs to the object.
 * This class brings new capabilities to the object.
 */

import { Misc } from '../misc/misc';
import { Modifier } from './modifier';
import { Logger } from '../logger/logger';

export class Modifiers {
    private readonly modifiers: Misc.KeyValue<string, Modifier> = new Misc.KeyValue<string, Modifier>();

    add(modifier: Modifier): void {
        if (this.modifiers.get(modifier.id)) {
            Logger.warn(`Can't add modifier, Id already exists: ${modifier.id}`);
            return undefined;
        }
        this.modifiers.add(modifier.id, modifier);
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
