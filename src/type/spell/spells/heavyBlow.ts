import type {Spell} from '../Spell.ts'

import heavyBlowImage from '../../../assets/sprite/spell/heavy-blow.png'
import {SpellName} from "../../../assets/string/spellName.ts";
import {SpellDesc} from "../../../assets/string/spellDesc.ts";
import {SpellSlotOptions} from "../../../util/function/spellSlot.ts";

export const heavyBlow: Spell = {
    id: 1,
    name: SpellName.heavyBlow,
    desc: SpellDesc.heavyBlow,
    spellSlot: SpellSlotOptions.exactSlot([6]),
    sprite: heavyBlowImage
}