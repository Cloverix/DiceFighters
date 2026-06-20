import type {EffectTemplate} from "../../type/effect/Effect.ts";
import type {Creature} from "../../type/creature/Creature.ts";

//Checks if the creature has given effect
export function hasEffect(creature: Creature, effectTemplate: EffectTemplate): boolean {
    return creature.effects.some(effect => effect.effectTemplate.name === effectTemplate.name);
}