export type SpellSlot = {kind: 'any'} |
    {kind: 'odd'} |
    {kind: 'even'} |
    {kind: 'range', start: number, end: number} |
    {kind: 'exact', slots: number[]} |
    {kind: 'none'}

export const SpellSlotOptions = {
    anySlot: (): SpellSlot => ({kind: 'any'}),
    oddSlot: (): SpellSlot => ({kind: 'odd'}),
    evenSlot: (): SpellSlot => ({kind: 'even'}),
    rangeSlot: (start: number, end: number): SpellSlot => ({kind: 'range', start, end}),
    exactSlot: (slots: number[]): SpellSlot => ({kind: 'exact', slots}),
    noneSlot: (): SpellSlot => ({kind: 'none'})
}

export function matchesDiceSlot(spellSlotOption: SpellSlot, diceSlot: number): boolean {
    switch (spellSlotOption.kind) {
        case 'any': return true;
        case 'odd': return diceSlot % 2 == 1;
        case 'even': return diceSlot % 2 == 0;
        case 'range': {
            const [start, end] = [spellSlotOption.start, spellSlotOption.end];
            return start <= diceSlot && diceSlot <= end;
        }
        case 'exact': return spellSlotOption.slots.includes(diceSlot);
        case 'none': return false;
        default: return false;
    }
}

export function strSpellSlotOption(spellSlotOption: SpellSlot): string {
    switch (spellSlotOption.kind) {
        case 'any': return 'any';
        case 'odd': return 'any odd';
        case 'even': return 'any even';
        case 'range': return `${spellSlotOption.start}-${spellSlotOption.end}`;
        case 'exact': {
            let ret = '';
            for (const val of spellSlotOption.slots) {
                ret += `${val}, `;
            }
            return ret.slice(0, -2);
        }
        case 'none': return 'none';
        default: return 'none';
    }
}