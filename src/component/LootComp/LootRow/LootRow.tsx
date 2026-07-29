import type { Spell } from "../../../type/spell/Spell"
import { LootSlot } from "../LootSlot/LootSlot"
import "./LootRow.css"

type LootRowProps = {
    lootList: Spell[],
    chosenLootIndex: number | null,
    onChoose?: (el: HTMLDivElement | null, lootIndex: number) => void,
    chosenStyle?: React.CSSProperties,
    disappearStyle?: React.CSSProperties,
    disabled?: boolean
}

export function LootRow({lootList, chosenLootIndex, onChoose, chosenStyle, disappearStyle, disabled}: LootRowProps) {
    return (
        <div className={`loot-row-root ${disabled ? 'disabled' : ''}`}>
            {lootList.map((spell, index) => <LootSlot
                key={index}
                spell={spell}
                lootIndex={index}
                refCallback={onChoose}
                style={
                    chosenLootIndex !== null
                    ? (chosenLootIndex === index ? chosenStyle : disappearStyle)
                    : undefined
                }
                />
            )}
        </div>
    )
}