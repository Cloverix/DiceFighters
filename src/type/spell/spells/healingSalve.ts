import type {Spell} from "../Spell.ts";
import {SpellName} from "../../../assets/string/spellName.ts";
import {SpellDesc} from "../../../assets/string/spellDesc.ts";
import {SpellSlotOptions} from "../../../util/function/spellSlot.ts";

export const healingSalve: Spell = {
    id: 3,
    name: SpellName.healingSalve,
    desc: SpellDesc.healingSalve,
    spellSlot: SpellSlotOptions.anySlot(),
    sprite: ""      //TODO: add sprite
}