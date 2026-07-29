import { useCallback, useEffect, useRef, useState } from "react";

type Coords = {x: number, y: number}

export function useLootGrabAnimation(
    lootEl: HTMLDivElement | null,
    inventoryButtonEl: HTMLDivElement | null,
    animationTimeSec: number,
    onEndAnimation?: () => void
) {

    function getCenterCoordinates(el: HTMLDivElement): Coords {
        const rect = el.getBoundingClientRect(); 
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return {x: centerX, y: centerY};
    }

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [lootRotate, setLootRotate] = useState(0);    //In radians
    const [lootScale, setLootScale] = useState(1);
    const [lootOpacity, setLootOpacity] = useState(1);
    const [otherRotateY, setOtherRotateY] = useState(0);    //In radians
    const [inventoryScale, setInventoryScale] = useState(1);
    const animationTimeoutId = useRef<number | null>(null);
    const innerTimeoutId = useRef<number | null>(null);

    const startAnimation = useCallback(() => {
        if (!lootEl || !inventoryButtonEl) return;
        
        const lootCenter = getCenterCoordinates(lootEl);
        const inventoryCenter = getCenterCoordinates(inventoryButtonEl);

        if (animationTimeoutId.current) {
            clearTimeout(animationTimeoutId.current);
            animationTimeoutId.current = null;
        }
        if (innerTimeoutId.current) {
            clearTimeout(innerTimeoutId.current);
            innerTimeoutId.current = null;
        }

        const dx = inventoryCenter.x - lootCenter.x;
        const dy = inventoryCenter.y - lootCenter.y;
        setTranslateX(dx);
        setTranslateY(dy);
        setLootRotate(Math.atan2(dy, dx));
        setLootScale(0.05);
        setOtherRotateY(Math.PI / 2);

        animationTimeoutId.current = setTimeout(() => {
            setInventoryScale(1.15);
            setLootOpacity(0);

            if (onEndAnimation) {
                onEndAnimation();
            }

            innerTimeoutId.current = setTimeout(() => {
                setInventoryScale(1);
            }, 150)
        }, animationTimeSec * 1000);
    }, [animationTimeSec, inventoryButtonEl, lootEl, onEndAnimation]);

    useEffect(() => {
        return () => {
            if (animationTimeoutId.current) {
                clearTimeout(animationTimeoutId.current);
            }
            if (innerTimeoutId.current) {
                clearTimeout(innerTimeoutId.current);
            }
        }
    }, [])

    return {translateX, translateY, lootRotate, lootScale, lootOpacity, otherRotateY, inventoryScale, startAnimation};
}