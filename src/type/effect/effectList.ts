import type {EffectTemplate} from "./Effect.ts";
import {effectName} from "../../assets/string/effect/effectName.ts";
import {effectDesc} from "../../assets/string/effect/effectDesc.ts";
import {burnAction} from "./effectAction/burnAction.ts";
import {stunAction} from "./effectAction/stunAction.ts";
import {wetOnApplyAction} from "./effectAction/wetOnApplyAction.ts";
import {deepWoundsOnApplyAction} from "./effectAction/deepWoundsOnApplyAction.ts";
import {strengthAction} from "./effectAction/strengthAction.ts";
import {weaknessAction} from "./effectAction/weaknessAction.ts";
import {reinforcedArmorAction} from "./effectAction/reinforcedArmorAction.ts";
import {brokenArmorAction} from "./effectAction/brokenArmorAction.ts";
import {preparationAction} from "./effectAction/preparationAction.ts";

export const effectList: Record<string, EffectTemplate> = {
    [effectName.burn]: {
        id: 1,
        name: effectName.burn,
        desc: effectDesc.burn,
        effectType: ['debuff', 'DOT'],
        effectActions: {'StartTurn': burnAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.stun]: {
        id: 2,
        name: effectName.stun,
        desc: effectDesc.stun,
        effectType: ['debuff'],
        effectActions: {'StartTurn': stunAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.wet]: {
        id: 3,
        name: effectName.wet,
        desc: effectDesc.wet,
        effectType: ['status'],
        effectActions: {'OnApply': wetOnApplyAction},
        single: true,
        sprite: ''    //TODO: add sprite
    },

    [effectName.deepWounds]: {
        id: 4,
        name: effectName.deepWounds,
        desc: effectDesc.deepWounds,
        effectType: ['debuff'],
        effectActions: {'OnApply': deepWoundsOnApplyAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.strength]: {
        id: 5,
        name: effectName.strength,
        desc: effectDesc.strength,
        effectType: ['buff', 'modifier'],
        effectActions: {'EndTurn': strengthAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.weakness]: {
        id: 6,
        name: effectName.weakness,
        desc: effectDesc.weakness,
        effectType: ['debuff', 'modifier'],
        effectActions: {'EndTurn': weaknessAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.damageUp]: {
        id: 7,
        name: effectName.damageUp,
        desc: effectDesc.damageUp,
        effectType: ['buff', 'modifier'],
        effectActions: {},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.damageDown]: {
        id: 8,
        name: effectName.damageDown,
        desc: effectDesc.damageDown,
        effectType: ['debuff', 'modifier'],
        effectActions: {},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.reinforcedArmor]: {
        id: 9,
        name: effectName.reinforcedArmor,
        desc: effectDesc.reinforcedArmor,
        effectType: ['buff', 'modifier'],
        effectActions: {'EndTurn': reinforcedArmorAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.brokenArmor]: {
        id: 10,
        name: effectName.brokenArmor,
        desc: effectDesc.brokenArmor,
        effectType: ['debuff', 'modifier'],
        effectActions: {'EndTurn': brokenArmorAction},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.defenceUp]: {
        id: 11,
        name: effectName.defenceUp,
        desc: effectDesc.defenceUp,
        effectType: ['buff', 'modifier'],
        effectActions: {},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.defenceDown]: {
        id: 12,
        name: effectName.defenceDown,
        desc: effectDesc.defenceDown,
        effectType: ['debuff', 'modifier'],
        effectActions: {},
        single: false,
        sprite: ''    //TODO: add sprite
    },

    [effectName.preparation]: {
        id: 13,
        name: effectName.preparation,
        desc: effectDesc.preparation,
        effectType: ['buff', 'modifier'],
        effectActions: {'OnApply': preparationAction},
        single: false,
        sprite: ''    //TODO: add sprite
    }
}