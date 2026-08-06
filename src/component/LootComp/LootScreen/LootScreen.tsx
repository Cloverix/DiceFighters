import React, { useCallback, useEffect, useRef, useState } from "react"
import { HP_PER_UPGRADE } from "../../../assets/constants/numericConstants"
import type { Spell } from "../../../type/spell/Spell"
import { LootRow } from "../LootRow/LootRow"
import "./LootScreen.css"

type LootScreenProps = {
    lootList: Spell[],
    className?: string,
    startAnimation?: () => void,
    onChoiceDone?: (chosenLoot: HTMLDivElement | null) => void,
    chosenItemStyle?: React.CSSProperties,
    itemDisappearStyle?: React.CSSProperties,
    onProceedButtonClick?: () => void
}

export function LootScreen({lootList, className, startAnimation, onChoiceDone, chosenItemStyle, itemDisappearStyle}: LootScreenProps) {
    const [chosenLootIndex, setChosenLootIndex] = useState<number | null>(null);
    const [choiceDone, setChoiceDone] = useState(false);

    const hasAnimated = useRef(false);

    const onChoose = useCallback((el: HTMLDivElement | null, lootIndex: number) => {
        if (onChoiceDone) {
            onChoiceDone(el);
        }
        setChosenLootIndex(lootIndex);
        setChoiceDone(true);
    }, [onChoiceDone]);

    //Start animation after first render on which loot is chosen
    useEffect(() => {
        if (startAnimation && chosenLootIndex !== null && !hasAnimated.current) {
            startAnimation()
            hasAnimated.current = true;
        }
    }, [chosenLootIndex, startAnimation])

    return (
        <div className={`loot-screen-root ${className ?? ''}`}>
            <strong className="loot-title">
                {'You won the battle!'}
            </strong>
            <p className="healed-to-full-text">
                {`You gained ${HP_PER_UPGRADE} max hp and were healed to full`}
            </p>
            <p className="loot-choose-text">
                Choose one of the following spells:
            </p>
            {choiceDone
            ? <div className="proceed-button-container" onClick={() => {}}>
                <span className="proceed-button-text">
                    Proceed
                </span>
            </div>
            : <LootRow
                lootList={lootList}
                chosenLootIndex={chosenLootIndex}
                onChoose={onChoose}
                chosenStyle={chosenItemStyle}
                disappearStyle={itemDisappearStyle}
                disabled={chosenLootIndex !== null}
            />
            }
        </div>
    )
}