import type {Sprite} from "../../assets/sprite/Sprite.ts";
import type {Creature} from "../creature/Creature.ts";
import type {GameState} from "../gameState/GameState.ts";

export interface Effect {
    effectTemplate: EffectTemplate;
    stackCount: number;
}

export type EffectTemplate = {
    id: number,
    name: string,
    desc: (stackCount: number) => string,
    effectActions: Partial<Record<TriggerOn, EffectAction>>,
    single: boolean,                //Determines if only one stack of an effect can be applied
    icon: Sprite
}

export type TriggerOn = 'StartTurn' | 'EndTurn' | 'OnApply'

export type EffectAction = (effectContext: EffectContext) => EffectResult

export interface EffectContext {
    targetCreature: Creature;
    stackCount: number;
    gameState: GameState;
}

//If stackCount is omitted, one stack of an effect will be applied, all stacks will be removed
//when calling applyEffect and removeEffect respectively
export type EffectReference = {effectName: string, stackCount?: number};

export interface EffectResult {
    damageDealt: number;
    healing: number;
    newStackCount?: number;
    applyEffects?: EffectReference[];
    removeEffects?: EffectReference[];
    logMessage: string;
}
