import type { EquipMoveData } from "../hook/useInventoryDrag";
import { type Player } from "../type/creature/Player";
import type { Dice } from "../type/dice/Dice";
import { equipOnDice } from "../type/dice/equipOnDice";
import type { GameState } from "../type/gameState/GameState";
import { cloneInventory } from "../type/inventory/cloneInventory";
import type { Inventory } from "../type/inventory/Inventory";
import type { Spell } from "../type/spell/Spell";

/**
 * Equips a spell from inventory to a specified dice slot
 * @param prevState - initial GameState
 * @param spell - spell to equip
 * @param moveData - data about where to equip the given spell
 */
export function equipSpell(prevState: GameState, spell: Spell, moveData: EquipMoveData): GameState {
    const oldPlayer: Player = prevState.player;

    switch (moveData.from) {
        case "inventory": {
            const inventoryIndex = moveData.inventoryIndex;
            const diceIndex = moveData.diceIndex;
            const slot = moveData.slot;

            const oldDice: Dice = oldPlayer.dices[diceIndex];
            const newDice: Dice | null = equipOnDice(spell, oldPlayer, oldDice, slot);

            if (!newDice) {
                return prevState;
            }

            const newDices: Dice[] = [...oldPlayer.dices];
            newDices[diceIndex] = newDice;

            const oldInventory: Inventory = oldPlayer.inventory;
            const newStoredSpells: Spell[] = oldInventory.storedSpells
                .filter((_, index) => index !== inventoryIndex);
            const newInventory: Inventory = cloneInventory({...oldInventory, storedSpells: newStoredSpells});

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
        case "dice": {
            const originDiceIndex = moveData.originDiceIndex;
            const originSlot = moveData.originSlot;
            const targetDiceIndex = moveData.targetDiceIndex;
            const targetSlot = moveData.targetSlot;

            const oldOriginDice: Dice = oldPlayer.dices[originDiceIndex];
            const newOriginDice: Dice | null = equipOnDice(null, oldPlayer, oldOriginDice, originSlot);
            if (!newOriginDice) {
                return prevState;
            }

            const changedDices: Dice[] = [...oldPlayer.dices];
            changedDices[originDiceIndex] = newOriginDice;
            const changedPlayer: Player = {
                ...oldPlayer,
                dices: changedDices
            }

            const oldTargetDice: Dice = changedPlayer.dices[targetDiceIndex];
            const newTargetDice: Dice | null = equipOnDice(spell, changedPlayer, oldTargetDice, targetSlot);
            if (!newTargetDice) {
                return prevState;
            }

            const newDices: Dice[] = [...changedPlayer.dices];
            newDices[targetDiceIndex] = newTargetDice;

            const newPlayer: Player = {
                ...changedPlayer,
                dices: newDices
            }

            return {
                ...prevState,
                player: newPlayer
            }
        }
    }
}