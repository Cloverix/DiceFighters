export function constructSpellLogMessage(diceValue: number, casterName: string, message: string): string {
    return `[${diceValue}] ${casterName} ${message}`;
}