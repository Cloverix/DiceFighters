import type {Spell} from "../Spell.ts";
import {SpellName} from "../../../assets/string/spellName.ts";
import {SpellDesc} from "../../../assets/string/spellDesc.ts";
import {SpellSlotOptions} from "../../../util/function/spellSlot.ts";

export const spark: Spell = {
    id: 2,
    name: SpellName.spark,
    desc: SpellDesc.spark,
    spellSlot: SpellSlotOptions.anySlot(),
    sprite: ""      //TODO: add sprite
}