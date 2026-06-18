import {SpellName} from "../../assets/string/spell/spellName.ts";
import {SpellDesc} from "../../assets/string/spell/spellDesc.ts";
import {SpellSlotOptions} from "./spellSlot.ts";
import type {Spell} from "./Spell.ts";
import heavyBlowImage from "../../assets/sprite/spell/heavy-blow.png";
import {
    dualWieldAction,
    eviscerateAction,
    healingSalveAction,
    heavyBlowAction, igniteAction,
    leftHookAction, lightningBoltAction, overTheLimitsAction,
    reapAction, rightHookAction,
    sparkAction, sprinkleAction,
    strikeAction
} from "./spellAction.ts";

export const spellList: Record<string, Spell> = {
    [SpellName.strike]: {
        id: 1,
        name: SpellName.strike,
        desc: SpellDesc.strike,
        spellSlot: SpellSlotOptions.anySlot(),
        spellAction: strikeAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.heavyBlow]: {
        id: 2,
        name: SpellName.heavyBlow,
        desc: SpellDesc.heavyBlow,
        spellSlot: SpellSlotOptions.exactSlot([6]),
        spellAction: heavyBlowAction,
        sprite: heavyBlowImage
    },

    [SpellName.spark]: {
        id: 3,
        name: SpellName.spark,
        desc: SpellDesc.spark,
        spellSlot: SpellSlotOptions.anySlot(),
        spellAction: sparkAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.healingSalve]: {
        id: 4,
        name: SpellName.healingSalve,
        desc: SpellDesc.healingSalve,
        spellSlot: SpellSlotOptions.exactSlot([3, 6, 9 ,12]),
        spellAction: healingSalveAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.reap]: {
        id: 5,
        name: SpellName.reap,
        desc: SpellDesc.reap,
        spellSlot: SpellSlotOptions.anySlot(),
        spellAction: reapAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.leftHook]: {
        id: 6,
        name: SpellName.leftHook,
        desc: SpellDesc.leftHook,
        spellSlot: SpellSlotOptions.oddSlot(),
        spellAction: leftHookAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.rightHook]: {
        id: 7,
        name: SpellName.rightHook,
        desc: SpellDesc.rightHook,
        spellSlot: SpellSlotOptions.evenSlot(),
        spellAction: rightHookAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.eviscerate]: {
        id: 8,
        name: SpellName.eviscerate,
        desc: SpellDesc.eviscerate,
        spellSlot: SpellSlotOptions.exactSlot([5]),
        spellAction: eviscerateAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.dualWield]: {
        id: 9,
        name: SpellName.dualWield,
        desc: SpellDesc.dualWield,
        spellSlot: SpellSlotOptions.anySlot(),
        spellAction: dualWieldAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.lightningBolt]: {
        id: 10,
        name: SpellName.lightningBolt,
        desc: SpellDesc.LightningBolt,
        spellSlot: SpellSlotOptions.exactSlot([4, 5, 6, 10, 11, 12]),
        spellAction: lightningBoltAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.ignite]: {
        id: 11,
        name: SpellName.ignite,
        desc: SpellDesc.ignite,
        spellSlot: SpellSlotOptions.rangeSlot(1, 5),
        spellAction: igniteAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.overTheLimits]: {
        id: 12,
        name: SpellName.overTheLimits,
        desc: SpellDesc.overTheLimits,
        spellSlot: SpellSlotOptions.anySlot(),
        spellAction: overTheLimitsAction,
        sprite: ""      //TODO: add sprite
    },

    [SpellName.sprinkle]: {
        id: 13,
        name: SpellName.sprinkle,
        desc: SpellDesc.sprinkle,
        spellSlot: SpellSlotOptions.exactSlot([1, 2]),
        spellAction: sprinkleAction,
        sprite: ""      //TODO: add sprite
    }
}