import type {Enemy} from "../../type/creature/Enemy.ts";
import type {Effect} from "../../type/effect/Effect.ts";
import type {Dice} from "../../type/dice/Dice.ts";
import sixFaceDiceSprite from "../../assets/sprite/dice/dice-6-side-empty.png";
import {FixedMap} from "../class/FixedMap.ts";
import defaultEnemySprite from "../../assets/sprite/creature/goblin.png";

/**
 * Get instance of an enemy. Id's of different enemies should be different.
 */
export function enemyInstance(
    id: number,
    name?: string,
    maxHp: number = 100,
    hp: number = 100,
    effects: Effect[] = [],
    dices: Dice[] = [{faceCount: 6, sprite: sixFaceDiceSprite, equippedSpells: new FixedMap(6)}],
    sprite: string = defaultEnemySprite
): Enemy {
    return {
        id: id,
        name: name ?? `creature-${id}`,
        maxHp: maxHp,
        hp: Math.min(hp, maxHp),
        effects: effects,
        dices: dices,
        sprite: sprite
    }
}