import { PlayerBuilder, type Player } from "../type/creature/Player";
import { cloneDice } from "../type/dice/cloneDice";
import type { Dice } from "../type/dice/Dice";
import { equipOnDice } from "../type/dice/equipOnDice";
import { GameStateBuilder, type GameState } from "../type/gameState/GameState";
import { cloneInventory } from "../type/inventory/cloneInventory";
import type { Inventory } from "../type/inventory/Inventory";
import type { Spell } from "../type/spell/Spell";

/**
 * Unequip spell from player's dice and put it to inventory
 * @param prevState - initial GameState
 * @param spell - spell to unequip
 * @param diceIndex - dice index from which to unequip the spell
 * @param slot - slot in which the target spell is located
 */
export function unequipSpell(prevState: GameState, spell: Spell, diceIndex: number, slot: number): GameState {
    const oldPlayer: Player = prevState.player;
    let newInventory: Inventory = cloneInventory(oldPlayer.inventory);

    const oldDice: Dice = oldPlayer.dices[diceIndex];
    const newDice: Dice | null = equipOnDice(null, oldPlayer, oldDice, slot);
    
    //return initial state if not equipped correctly
    if (!newDice) {
        return prevState;
    }

    const newDices: Dice[] = [...oldPlayer.dices];
    newDices[diceIndex] = newDice;

    const newStoredSpells: Spell[] = [...newInventory.storedSpells];
    newStoredSpells.push(spell);
    newInventory = {...newInventory, storedSpells: newStoredSpells};

    const newPlayer: Player = {
        ...oldPlayer,
        dices: newDices,
        inventory: newInventory
    };
    
    return {
        ...prevState,
        player: newPlayer
    }
}