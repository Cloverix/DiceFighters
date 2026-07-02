import type {GameState} from "../type/gameState/GameState.ts";
import type {Enemy} from "../type/creature/Enemy.ts";
import type {Player} from "../type/creature/Player.ts";
import {diceRollResult} from "../util/function/diceRollResult.ts";
import type {Spell, SpellContext} from "../type/spell/Spell.ts";
import {getEquippedSpell} from "../util/function/getEquippedSpell.ts";
import {castSpell} from "./castSpell.ts";
import {hasEffect} from "../util/function/hasEffect.ts";
import {effectList} from "../type/effect/effectList.ts";
import {effectName} from "../assets/string/effect/effectName.ts";
import {triggerEffects} from "./triggerEffects.ts";

//This function is called whenever a new turn is taken by player or enemy
export function takeTurn(gameState: GameState): GameState {
    let changedGameState = gameState;
    let creature: Player | Enemy = changedGameState[changedGameState.currentTurn];          //Creature which's turn it is now

    changedGameState = triggerEffects(changedGameState.currentTurn, ['StartTurn'], changedGameState);
    creature = changedGameState[changedGameState.currentTurn];

    if (hasEffect(creature, effectList[effectName.stun])) {
        return changedGameState;
    }

    //Roll dices and cast spells
    const rollResults: number[] = creature.dices.map(dice => diceRollResult(dice));
    const spellsToCast: Spell[] = rollResults.map((result, index) => getEquippedSpell(creature.dices[index], result));
    spellsToCast.forEach((spell, index) => {
        const spellContext: SpellContext = {
            casterCreature: creature,
            dice: creature.dices[index],
            diceValue: rollResults[index],
            gameState: changedGameState
        }
        changedGameState = castSpell(spell, spellContext);
        creature = changedGameState[changedGameState.currentTurn];
    })

    changedGameState = triggerEffects(changedGameState.currentTurn, ['EndTurn'], changedGameState);
    creature = changedGameState[changedGameState.currentTurn];

    /*
    if (checkWinCondition(changedGameState)) {
        TODO: trigger any after-battle effects??? (maybe a separate function for this)
        TODO: OR remove this if-statement
    }
    */
    return changedGameState;
}