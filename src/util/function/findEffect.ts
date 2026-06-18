import type {Effect} from "../../type/effect/Effect.ts";

//Return index in listEffects array where effect is found, otherwise return -1
export function findEffect(effectName: string, listEffects: Effect[]): number {
    for (let i = 0; i < listEffects.length; i++) {
        if (listEffects[i].effectTemplate.name === effectName) {
            return i;
        }
    }
    return -1;
}