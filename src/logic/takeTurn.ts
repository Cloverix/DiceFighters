import { effectName } from "../assets/string/effect/effectName.ts";
import { spellName } from "../assets/string/spell/spellName.ts";
import type { Enemy } from "../type/creature/Enemy.ts";
import type { Player } from "../type/creature/Player.ts";
import type { Dice } from "../type/dice/Dice.ts";
import { effectList } from "../type/effect/effectList.ts";
import type { GameState, Target } from "../type/gameState/GameState.ts";
import type { Spell, SpellContext } from "../type/spell/Spell.ts";
import { spellList } from "../type/spell/spellList.ts";
import { hasEffect } from "../util/function/hasEffect.ts";
import { castSpell } from "./castSpell.ts";
import { triggerEffects } from "./triggerEffects.ts";

/**
 * This function is called whenever a new turn is taken by player or enemy.
 * @param gameState - current game state.
 * @return - updated game state after a turn is taken.
 */
export function takeTurn(gameState: GameState): GameState {
    let changedGameState: GameState = {...gameState};
    const currentTurn: Target = changedGameState.currentTurn;
    let creature: Player | Enemy = changedGameState[currentTurn];          //Creature which's turn it is now

    changedGameState = triggerEffects(currentTurn, ['StartTurn'], changedGameState);
    creature = changedGameState[currentTurn];

    if (hasEffect(creature, effectList[effectName.stun])) {
        return changedGameState;
    }

    //Extract roll results
    const rollResults: Map<number, number> = changedGameState.currentRollResults[currentTurn];

    //TODO: for debugging, remove later
    if (rollResults.size !== creature.dices.length) {
        console.warn(`${creature.name} --- rollResults len: ${rollResults.size}; dices length: ${creature.dices.length}`)
        console.warn('Mismatch between roll results and creature dices length!');
    }

    //Cast spells
    rollResults.forEach((result, diceId) => {
        const dice: Dice | undefined = creature.dices.find(dice => dice.id === diceId);
        //If dice is not found, spell is not being cast
        if (!dice) {
            return;
        }
        const spell: Spell = dice?.equippedSpells.get(result - 1) ?? spellList[spellName.strike];
        const spellContext: SpellContext = {
            casterCreature: creature,
            dice: dice,
            diceValue: result,
            gameState: changedGameState
        };
        changedGameState = castSpell(spell, spellContext);
        creature = changedGameState[currentTurn];
    })

    changedGameState = triggerEffects(currentTurn, ['EndTurn'], changedGameState);
    creature = changedGameState[currentTurn];

    const nextTurn: Target = currentTurn === 'player' ? 'enemy' : 'player';

    /*
    if (checkWinCondition(changedGameState)) {
        TODO: trigger any after-battle effects??? (maybe a separate function for this)
        TODO: OR remove this if-statement
    }
    */
    return {
        ...changedGameState,
        currentTurn: nextTurn
    };
}