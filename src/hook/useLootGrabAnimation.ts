import React, { useCallback, useEffect, useRef, useState } from "react";

type Coords = {x: number, y: number}

export function useLootGrabAnimation(
    lootElementRef: React.RefObject<HTMLDivElement | null>,
    inventoryButtonRef: React.RefObject<HTMLDivElement | null>,
    animationTimeSec: number
) {

    function getCenterCoordinates(el: HTMLDivElement): Coords {
        const rect = el.getBoundingClientRect(); 
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        return {x: centerX, y: centerY};
    }

    const [translateX, setTranslateX] = useState(0);
    const [translateY, setTranslateY] = useState(0);
    const [rotateRad, setRotateRad] = useState(0);
    const [lootScale, setLootScale] = useState(1);
    const [lootOpacity, setLootOpacity] = useState(1);
    const [inventoryScale, setInventoryScale] = useState(1);
    const animationTimeoutId = useRef<number | null>(null);
    const innerTimeoutId = useRef<number | null>(null);

    const startAnimation = useCallback(() => {
        if (!lootElementRef.current || !inventoryButtonRef.current) return;
        
        const lootCenter = getCenterCoordinates(lootElementRef.current);
        const inventoryCenter = getCenterCoordinates(inventoryButtonRef.current);

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
        setRotateRad(Math.atan2(dy, dx));
        setLootScale(0.05);

        animationTimeoutId.current = setTimeout(() => {
            setInventoryScale(1.15);
            setLootOpacity(0);

            innerTimeoutId.current = setTimeout(() => {
                setInventoryScale(1);
            }, 150)
        }, animationTimeSec * 1000);
    }, [animationTimeSec, inventoryButtonRef, lootElementRef]);

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

    return {translateX, translateY, rotateRad, lootScale, lootOpacity, inventoryScale, startAnimation};
}