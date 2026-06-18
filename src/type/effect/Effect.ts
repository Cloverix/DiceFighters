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
    effectAction: EffectAction,
    triggerOn: TriggerOn,
    icon: Sprite
}

export type TriggerOn = 'StartTurn' | 'EndTurn' | 'OnApply' |'None'

export type EffectAction = (effectContext: EffectContext) => EffectResult

export interface EffectContext {
    target: Creature;
    stackCount: number;
    gameState: GameState;
}

export type EffectReference = {effectName: string, stackCount: number};

export interface EffectResult {
    damageDealt: number;
    healing: number;
    newStackCount: number;
    applyEffects?: EffectReference[];
    removeEffects?: EffectReference[];
    logMessage: string;
}
