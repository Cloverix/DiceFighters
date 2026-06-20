import type {Creature} from "../../type/creature/Creature.ts";

//Checks if given creature is the player
export function isPlayer(creature: Creature): boolean {
    return 'inventory' in creature;
}