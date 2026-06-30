import type {EffectTemplate, EffectType} from "../../type/effect/Effect.ts";

/**
 * Filter effect templates from the effectTemplates list based on their type.
 * @param effectTemplates - effect templates to filter.
 * @param targetTypes - effects that are returned must match at least one of the passed effect types.
 * If omitted, returned effects can be of any type.
 */
export function filterEffectsByType(effectTemplates: EffectTemplate[], targetTypes?: EffectType[]): EffectTemplate[] {
    const templates: EffectTemplate[] = [...effectTemplates];
    if (!targetTypes) {
        return [...templates];
    }

    const matchingEffects: EffectTemplate[] = [];
    templates.forEach(template => {
        const types = template.effectType;
        for (const type of types) {
            if (targetTypes.includes(type)) {
                matchingEffects.push(template);
                break;
            }
        }
    })

    return matchingEffects;
}
