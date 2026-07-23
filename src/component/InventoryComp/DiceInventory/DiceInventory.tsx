import { useCallback, useEffect, useRef, useState } from "react"
import { DICE_SLOTS_COUNT } from "../../../assets/constants/numericConstants"
import type { Dice } from "../../../type/dice/Dice"
import type { Spell } from "../../../type/spell/Spell"
import { FixedMap } from "../../../util/class/FixedMap"
import { DiceSlot } from "../DiceSlot/DiceSlot"
import "./DiceInventory.css"

type DiceInventoryProps = {
    dice: Dice,
    onMount: (refs: Map<number, HTMLDivElement>) => void
}

export function DiceInventory({dice, onMount}: DiceInventoryProps) {
    const equippedSpells: FixedMap<Spell> = dice.equippedSpells;

    const diceInventoryRef = useRef<Map<number, HTMLDivElement>>(new Map());
    const [refSize, setRefSize] = useState(0);

    const diceSlotRef = useCallback((slot: number) => {
        return (el: HTMLDivElement | null) => {
            if (el) {
                diceInventoryRef.current.set(slot, el);
            }
            else {
                diceInventoryRef.current.delete(slot);
            }
            setRefSize(diceInventoryRef.current.size);
        }
    }, [])

    useEffect(() => {
        if (refSize === DICE_SLOTS_COUNT) {
            onMount(diceInventoryRef.current);
        }
    }, [refSize, onMount])
    
    return (
        <div className='dice-inventory-container'>
            <DiceSlot slot={1} innerRef={diceSlotRef(1)} spell={equippedSpells.get(0)} className="slot-1"/>
            <DiceSlot slot={2} innerRef={diceSlotRef(2)} spell={equippedSpells.get(1)} className="slot-2"/>
            <DiceSlot slot={3} innerRef={diceSlotRef(3)} spell={equippedSpells.get(2)} className="slot-3"/>
            <DiceSlot slot={4} innerRef={diceSlotRef(4)} spell={equippedSpells.get(3)} className="slot-4"/>
            <DiceSlot slot={5} innerRef={diceSlotRef(5)} spell={equippedSpells.get(4)} className="slot-5"/>
            <DiceSlot slot={6} innerRef={diceSlotRef(6)} spell={equippedSpells.get(5)} className="slot-6"/>
        </div>
    )
}