import type {Sprite} from "../../assets/sprite/Sprite.ts";
import type {SpellSlot} from "./spellSlot.ts";
import type {Target, GameState} from "../gameState/GameState.ts";
import type {EffectReference} from "../effect/Effect.ts";
import type {Creature} from "../creature/Creature.ts";
import type {Dice} from "../dice/Dice.ts";

export interface Spell {
    id: number;
    name: string;
    desc: string;
    spellSlot: SpellSlot;
    spellAction: SpellAction;
    sprite: Sprite;
}

export type SpellAction = (spellContext: SpellContext) => SpellResult;

export interface SpellContext {
    casterCreature: Creature;
    dice: Dice;                 //Dice on which the spell is equipped
    diceValue: number;
    gameState: GameState
}

export interface SpellResult {
    caster: Target;
    damage?: number;
    hitTimes?: number;
    healing?: number;
    applyToCaster?: EffectReference[];
    removeFromCaster?: EffectReference[],
    applyToOpponent?: EffectReference[];
    removeFromOpponent?: EffectReference[];
    customSpellActions?: CustomSpellAction[];
    logMessage: string;
}

export type CustomSpellAction =
    | {
    type: 'castSpell',
    spellName: string,
    caster: Target,
    dice: Dice,
    diceValue: number
} | {
    type: 'changeEquippedSlot',
    changeSubject: Target,
    currentDiceIndex: number,
    currentSlot: number,
    targetDiceIndex: number,
    targetSlot: number
}