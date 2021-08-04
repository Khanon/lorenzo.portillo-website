import { Misc } from '../../misc/misc';
import { ActorModifier } from './actor-modifier';
import { Logger } from '../../logger/logger';
import { ActorModifierList } from './actor-modifiers-list';
import { SimpleMovement } from '../../physics/simple-movement';

declare type ModifiersType = SimpleMovement;

export class ActorModifiers {
    private readonly modifiers: Misc.KeyValue<ActorModifierList, ActorModifier> = new Misc.KeyValue<ActorModifierList, ActorModifier>();

    add(modifierId: ActorModifierList): void {
        switch (modifierId) {
            case ActorModifierList.SimpleMovement:
                this.modifiers.add(modifierId, new SimpleMovement());
                break;
            default:
                Logger.warn('Unknown modifier:', modifierId);
        }
    }

    get(modifierId: ActorModifierList): ModifiersType {
        const modifier = this.modifiers.get(modifierId);
        if (!modifier) {
            Logger.error('Modifier not found:', modifierId);
            return undefined;
        }
        switch (modifierId) {
            case ActorModifierList.SimpleMovement:
                return modifier as SimpleMovement;
        }
    }
}
