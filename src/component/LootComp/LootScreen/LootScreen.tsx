import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { HP_PER_UPGRADE } from "../../../assets/constants/numericConstants"
import { useLootGrabAnimation } from "../../../hook/useLootGrabAnimation"
import type { Spell } from "../../../type/spell/Spell"
import { InventoryButton } from "../../Shared/InventroyButton/InventoryButton"
import { LootRow } from "../LootRow/LootRow"
import "./LootScreen.css"

type LootScreenProps = {
    lootList: Spell[]
}

export function LootScreen({lootList}: LootScreenProps) {
    const chosenLootRef = useRef<HTMLDivElement | null>(null);
    const inventoryButtonRef = useRef<HTMLDivElement | null>(null);

    const [chosenLootIndex, setChosenLootIndex] = useState<number | null>(null);

    const animationTimeSec = useMemo(() => 0.5, []);

    const onChoose = useCallback((el: HTMLDivElement | null, lootIndex: number) => {
        chosenLootRef.current = el;
        setChosenLootIndex(lootIndex);
    }, []);

    const {
        translateX,
        translateY,
        rotateRad,
        lootScale,
        lootOpacity,
        inventoryScale,
        startAnimation
    } = useLootGrabAnimation(chosenLootRef, inventoryButtonRef, animationTimeSec);

    //Start animation after first render on which loot is chosen
    useEffect(() => {
        if (chosenLootIndex !== null) {
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
                animatedStyle={{
                    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotateRad}rad) scale(${lootScale})`,
                    opacity: lootOpacity,
                    pointerEvents: 'none',
                    transition: `transform ${animationTimeSec}s ease-in, scale ${animationTimeSec}s ease-in`
                }}
                disabled={chosenLootIndex !== null}
            />
            {/*TODO: for testing*/}
            <InventoryButton isOpened={false} onClick={() => {}} innerRef={inventoryButtonRef} style={{
                scale: inventoryScale,
                position: 'fixed',
                top: '90vh',
                left: '90vw'
            }}/>
        </div>
    )
}