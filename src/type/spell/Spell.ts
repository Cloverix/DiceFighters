import type {Sprite} from "../../util/type/Sprite.ts";
import type {SpellSlot} from "../../util/function/spellSlot.ts";
import type {GameState} from "../gameState/GameState.ts";
import type {Effect} from "../effect/Effect.ts";

export interface Spell {
    id: number;
    name: string;
    desc: string;
    spellSlot: SpellSlot;
    spellEffect: SpellEffect;
    sprite: Sprite;
}

export type SpellEffect = (spellContext: SpellContext) => SpellResult;

export interface SpellContext {
    caster: 'player' | 'enemy';
    diceValue: number;
    gameState: GameState
}

export interface SpellResult {
    damageDealt: number;
    healing: number;
    applyToCaster: Effect[];
    applyToEnemy: Effect[];
    logMessage: string;
}