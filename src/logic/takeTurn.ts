import type {GameState, Target} from "../type/gameState/GameState.ts";
import type {Enemy} from "../type/creature/Enemy.ts";
import type {Player} from "../type/creature/Player.ts";
import type {Spell, SpellContext} from "../type/spell/Spell.ts";
import {getEquippedSpell} from "../util/function/getEquippedSpell.ts";
import {castSpell} from "./castSpell.ts";
import {hasEffect} from "../util/function/hasEffect.ts";
import {effectList} from "../type/effect/effectList.ts";
import {effectName} from "../assets/string/effect/effectName.ts";
import {triggerEffects} from "./triggerEffects.ts";

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

    //Cast spells
    const rollResults: number[] = changedGameState.currentRollResults[currentTurn];

    //TODO: for debugging, remove later
    if (rollResults.length !== creature.dices.length) {
        console.warn('Mismatch between roll results and creature dices length!');
    }

    const spellsToCast: Spell[] = rollResults.map((result, index) => getEquippedSpell(creature.dices[index], result));
    spellsToCast.forEach((spell, index) => {
        const spellContext: SpellContext = {
            casterCreature: creature,
            dice: creature.dices[index],
            diceValue: rollResults[index],
            gameState: changedGameState
        }
        changedGameState = castSpell(spell, spellContext);
        creature = changedGameState[currentTurn];
    })

    changedGameState = triggerEffects(currentTurn, ['EndTurn'], changedGameState);
    creature = changedGameState[currentTurn];

    /*
    if (checkWinCondition(changedGameState)) {
        TODO: trigger any after-battle effects??? (maybe a separate function for this)
        TODO: OR remove this if-statement
    }
    */
    return changedGameState;
}