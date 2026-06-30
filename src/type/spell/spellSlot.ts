export type SpellSlot = {kind: 'any'} |
    {kind: 'odd'} |
    {kind: 'even'} |
    {kind: 'ranges', ranges: RangeReference[]} |
    {kind: 'exact', slots: number[]} |
    {kind: 'none'}

export const SpellSlotOptions = {
    anySlot: (): SpellSlot => ({kind: 'any'}),
    oddSlot: (): SpellSlot => ({kind: 'odd'}),
    evenSlot: (): SpellSlot => ({kind: 'even'}),
    rangesSlot: (...ranges: RangeReference[]): SpellSlot => ({kind: 'ranges', ranges: ranges}),
    exactSlot: (slots: number[]): SpellSlot => ({kind: 'exact', slots}),
    noneSlot: (): SpellSlot => ({kind: 'none'})
}

type RangeReference = [number, number]      //index 0 = start, index 1 = end

export function matchesDiceSlot(spellSlotOption: SpellSlot, diceSlot: number): boolean {
    switch (spellSlotOption.kind) {
        case 'any': return true;
        case 'odd': return diceSlot % 2 == 1;
        case 'even': return diceSlot % 2 == 0;
        case 'ranges': {
            return spellSlotOption.ranges.some(range => {
                const start = range[0];
                const end = range[1];
                return start <= diceSlot && diceSlot <= end;
            })
        }
        case 'exact': return spellSlotOption.slots.includes(diceSlot);
        case 'none': return false;
        default: return false;
    }
}

//Gives formatted representation of SpellSlotOption
export function strSpellSlotOption(spellSlotOption: SpellSlot): string {
    switch (spellSlotOption.kind) {
        case 'any': return 'any';
        case 'odd': return 'any odd';
        case 'even': return 'any even';
        case 'ranges': {
            const ranges: string[] = spellSlotOption.ranges.map(range => `${range[0]}-${range[1]}`);
            return ranges.join(', ');
        }
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