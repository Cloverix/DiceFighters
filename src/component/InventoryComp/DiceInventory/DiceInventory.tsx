import type { Dice } from "../../../type/dice/Dice"
import type { Spell } from "../../../type/spell/Spell"
import { DiceSlot } from "../DiceSlot/DiceSlot"
import { FixedMap } from "../../../util/class/FixedMap"
import "./DiceInventory.css"

type DiceInventoryProps = {
    dice: Dice
}

export function DiceInventory({dice}: DiceInventoryProps) {
    const equippedSpells: FixedMap<Spell> = dice.equippedSpells;
    
    return (
        <div className='dice-inventory-container'>
            <DiceSlot slot={1} spell={equippedSpells.get(0)} className="slot-1"/>
            <DiceSlot slot={2} spell={equippedSpells.get(1)} className="slot-2"/>
            <DiceSlot slot={3} spell={equippedSpells.get(2)} className="slot-3"/>
            <DiceSlot slot={4} spell={equippedSpells.get(3)} className="slot-4"/>
            <DiceSlot slot={5} spell={equippedSpells.get(4)} className="slot-5"/>
            <DiceSlot slot={6} spell={equippedSpells.get(5)} className="slot-6"/>
        </div>
    )
}