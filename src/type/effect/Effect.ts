import type {Creature} from "../creature/Creature.ts";
import type {GameState, Target} from "../gameState/GameState.ts";

export interface Effect {
    effectTemplate: EffectTemplate;
    stackCount: number;
}

export type EffectTemplate = {
    id: number,
    name: string,
    desc: (stackCount: number) => string,
    effectType: EffectType[],
    effectActions: Partial<Record<TriggerOn, EffectAction>>,
    single: boolean,                //Determines if only one stack of an effect can be applied
    sprite: string
}

/**Buff - provides useful effects to the creature.
 * Debuff - provides harmful effects to creature.
 * Status - acts as a status, altering effects of some abilities and effects. usually doesn't do anything on its own (ex. Wet).
 * Modifier - modifies characteristics of cast spells, weakening or strengthening them (ex. Strength, Damage reduction)
 * DOT - deals damage to the creature occasionally.
 */
export type EffectType = 'buff' | 'debuff' | 'status' | 'modifier' | 'DOT' | 'special'

export type TriggerOn = 'StartTurn' | 'EndTurn' | 'OnApply'

export type EffectAction = (effectContext: EffectContext) => EffectResult

export interface EffectContext {
    targetCreature: Creature;   //Creature which the effect is applied to
    stackCount: number;
    gameState: GameState;
}

//If stackCount is omitted, one stack of an effect will be applied, all stacks will be removed
// when calling applyEffect and removeEffect respectively
export type EffectReference = {effectName: string, stackCount?: number};

export interface EffectResult {
    target: Target,
    damageDealt?: number;
    healing?: number;
    newStackCount?: number;
    applyEffects?: EffectReference[];
    removeEffects?: EffectReference[];
    logMessage?: string;
}
