import type { Inventory } from "./Inventory";

/**
 * Makes deep copy of inventory given
 * @param inventory - inventory to clone
 */
export function cloneInventory(inventory: Inventory): Inventory {
    return {
        ...inventory,
        storedSpells: [...inventory.storedSpells]
    };
}