import React, { useCallback, useEffect, useState } from "react"
import { HP_PER_UPGRADE } from "../../../assets/constants/numericConstants"
import type { Spell } from "../../../type/spell/Spell"
import { LootRow } from "../LootRow/LootRow"
import "./LootScreen.css"

type LootScreenProps = {
    lootList: Spell[],
    startAnimation?: () => void,
    onChoiceDone?: (chosenLoot: HTMLDivElement | null) => void,
    chosenItemStyle?: React.CSSProperties,
    itemDisappearStyle?: React.CSSProperties,
}

export function LootScreen({lootList, startAnimation, onChoiceDone, chosenItemStyle, itemDisappearStyle}: LootScreenProps) {
    //const chosenLootRef = useRef<HTMLDivElement | null>(null);

    const [chosenLootIndex, setChosenLootIndex] = useState<number | null>(null);

    //const animationTimeSec = useMemo(() => 0.5, []);

    /*
    const onChoose = useCallback((el: HTMLDivElement | null, lootIndex: number) => {
        chosenLootRef.current = el;
        setChosenLootIndex(lootIndex);
    }, []);
    */

    const onChoose = useCallback((el: HTMLDivElement | null, lootIndex: number) => {
        if (onChoiceDone) {
            onChoiceDone(el);
        }
        setChosenLootIndex(lootIndex);
    }, [onChoiceDone]);

    /*
    const {
        translateX,
        translateY,
        lootRotate,
        lootScale,
        lootOpacity,
        otherRotateY,
        inventoryScale,
        startAnimation
    } = useLootGrabAnimation(chosenLootRef, inventoryButtonRef, animationTimeSec, () => setNewLootIndicator(true));
    */

    //Start animation after first render on which loot is chosen
    useEffect(() => {
        if (startAnimation && chosenLootIndex !== null) {
            startAnimation()
        }
    }, [chosenLootIndex, startAnimation])

    return (
        <div className="loot-screen-root">
            <strong className="loot-title">
                {`You gained ${HP_PER_UPGRADE} max hp`}
            </strong>
            <p className="healed-to-full-text">
                You were healed to full
            </p>
            <p className="loot-choose-text">
                Choose one of the following spells:
            </p>
            <LootRow
                lootList={lootList}
                chosenLootIndex={chosenLootIndex}
                onChoose={onChoose}
                chosenStyle={chosenItemStyle}
                disappearStyle={itemDisappearStyle}
                disabled={chosenLootIndex !== null}
            />
        </div>
    )
}