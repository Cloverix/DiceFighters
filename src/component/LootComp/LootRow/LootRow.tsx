import type { Spell } from "../../../type/spell/Spell"
import { LootSlot } from "../LootSlot/LootSlot"
import "./LootRow.css"

type LootRowProps = {
    lootList: Spell[],
    chosenLootIndex: number | null,
    onChoose?: (el: HTMLDivElement | null, lootIndex: number) => void,
    animatedStyle?: React.CSSProperties,
    disabled?: boolean
}

export function LootRow({lootList, chosenLootIndex, onChoose, animatedStyle, disabled}: LootRowProps) {
    return (
        <div className={`loot-row-root ${disabled ? 'disabled' : ''}`}>
            {lootList.map((spell, index) => <LootSlot
                key={index}
                spell={spell}
                lootIndex={index}
                isChosen={chosenLootIndex === index}
                refCallback={onChoose}
                animatedStyle={animatedStyle}
                />
            )}
        </div>
    )
}