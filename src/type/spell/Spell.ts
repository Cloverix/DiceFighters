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
    category?: SpellCategory[];
    spellSlot: SpellSlot;
    spellAction: SpellAction;
    sprite: Sprite;
}

export type SpellCategory = 'unique' | 'enemyExclusive' | 'playerExclusive'

export type SpellAction = (spellContext: SpellContext) => SpellResult;

export interface SpellContext {
    casterCreature: Creature;
    dice: Dice;                 //Dice on which the spell is equipped
    diceValue: number;
    gameState: GameState
}

export interface SpellResult {
    caster: Target;
    casterName: string,
    diceValue: number,
    damage?: number;
    hitTimes?: number;
    healing?: number;
    applyToCaster?: EffectReference[];
    removeFromCaster?: EffectReference[],
    applyToOpponent?: EffectReference[];
    removeFromOpponent?: EffectReference[];
    customSpellActions?: CustomSpellAction[];
    logMessage?: SpellLogMethod
}

export type SpellLogMethod = {method: 'message', message: string} | {method: 'generator', generator: SpellLogGenerator}

export type SpellLogGenerator = (spellResult: SpellResult, gameState: GameState) => string

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
    currentDiceIndex: number,           //Index of a dice in dices[] list on which the spell is equipped before moving
    currentSlot: number,                //Slot on which the spell is equipped before moving (1-indexed)
    targetDiceIndex: number,            //Index of a dice in dices[] list which the spell will try to move to
    targetSlot: number                  //Slot which the spell will try to move to (1-indexed)
}