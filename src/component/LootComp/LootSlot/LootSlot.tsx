import { useCallback, useRef } from "react";
import type { Spell } from "../../../type/spell/Spell";
import "./LootSlot.css";

type LootSlotProps = {
    spell: Spell,
    lootIndex: number,
    isChosen: boolean,
    refCallback?: (el: HTMLDivElement | null, lootIndex: number) => void,
    animatedStyle?: React.CSSProperties
}

export function LootSlot({spell, lootIndex, isChosen, refCallback, animatedStyle}: LootSlotProps) {
    const slotRef = useRef<HTMLDivElement | null>(null);

    const onClick = useCallback(() => {
        if (refCallback) {
            refCallback(slotRef.current, lootIndex);
        }
    }, [refCallback, lootIndex]);

    return (
        <div className="loot-slot-root"
            style={isChosen ? animatedStyle : undefined}
            ref={slotRef}
            onClick={onClick}
        >
            <img className="loot-spell-sprite" src={spell.sprite} alt={spell.name}/>
            <strong className="spell-name">
                {spell.name}
            </strong>
            <p className="spell-desc">
                {spell.desc}
            </p>
        </div>
    )
}