import spriteOne from "../../assets/sprite/dice/dice-face-1.png"
import spriteTwo from "../../assets/sprite/dice/dice-face-2.png"
import spriteThree from "../../assets/sprite/dice/dice-face-3.png"
import spriteFour from "../../assets/sprite/dice/dice-face-4.png"
import spriteFive from "../../assets/sprite/dice/dice-face-5.png"
import spriteSix from "../../assets/sprite/dice/dice-face-6.png"

/**
 * Returns path to dice face sprite corresponding to the given slot. If no sprite is found, returns null.
 * @param slot - dice slot
 */
export function selectDiceSprite(slot: number): string | null {
    switch(slot) {
        case 1: return spriteOne;
        case 2: return spriteTwo;
        case 3: return spriteThree;
        case 4: return spriteFour;
        case 5: return spriteFive;
        case 6: return spriteSix;
        default: return null;
    }
}