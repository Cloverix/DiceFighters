import type {Player} from "../../type/creature/Player.ts";
import type {Effect} from "../../type/effect/Effect.ts";
import type {Dice} from "../../type/dice/Dice.ts";
import defaultPlayerSprite from "../../assets/sprite/creature/player.png"
import type {Inventory} from "../../type/inventory/Inventory.ts";
import sixFaceDiceSprite from "../../assets/sprite/dice/dice-6-side-empty.png"
import {FixedMap} from "../class/FixedMap.ts";

/**
 * Get instance of a player. Hp is at max equal to maxHp. Id of the created player is 0.
 * Only one instance of the player should exist
 */
export function playerInstance(
    name: string = 'player',
    maxHp: number = 100,
    hp: number = 100,
    effects: Effect[] = [],
    dices: Dice[] = [{faceCount: 6, sprite: sixFaceDiceSprite, equippedSpells: new FixedMap(6)}],
    sprite: string = defaultPlayerSprite,
    inventory: Inventory = {storedSpells: []}
): Player {
    return {
        id: 0,
        name: name,
        maxHp: maxHp,
        hp: Math.min(hp, maxHp),
        effects: effects,
        dices: dices,
        sprite: sprite,
        inventory: inventory
    }
}