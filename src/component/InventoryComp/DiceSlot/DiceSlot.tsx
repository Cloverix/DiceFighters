import defaultEmptyDiceSprite from "../../../assets/sprite/dice/dice-6-side-empty.png"
import type { Spell } from "../../../type/spell/Spell"
import { selectDiceSprite } from "../../../util/function/selectDiceSprite"
import { InventorySlot } from "../InventorySlot/InventorySlot"
import "./DiceSlot.css"

type DiceSlotProps = {
    slot: number,
    spell: Spell | null,
    className?: string,
    innerRef?: React.Ref<HTMLDivElement>,
    onMouseDown?: (e: React.MouseEvent) => void,
    width?: number,
    height?: number
}

export function DiceSlot({slot, spell, className, innerRef, onMouseDown, width = 64, height = 64}: DiceSlotProps) {
    const emptyDiceSprite = selectDiceSprite(slot);

    return (
        spell
        ? <InventorySlot
            spell={spell}
            className={className}
            innerRef={innerRef}
            onMouseDown={onMouseDown}
            width={width}
            height={height}/>
        : (
            <div
                className={`dice-slot-container ${className ?? ''}`}
                ref={innerRef}
                style={{
                    width: `${width}px`,
                    height: `${height}px`
                }}
            >
                <img className={`empty-slot-img slot-${slot}`}
                    alt={`slot-${slot}`}
                    src={emptyDiceSprite ?? defaultEmptyDiceSprite}
                />
            </div>
        )
    )
}