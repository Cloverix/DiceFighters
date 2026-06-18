import type {Creature} from "../../type/creature/Creature.ts";

export function isPlayer(creature: Creature): boolean {
    return 'inventory' in creature;
}