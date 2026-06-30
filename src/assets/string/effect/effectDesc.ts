export const effectDesc = {
    burn: (stackCount: number): string => `Deal ${stackCount} damage at the start of turn, them decrease burn by 1`,
    stun: (): string => 'Skip its next turn',
    wet: (): string => "It's wet",
    deepWounds: (stackCount: number): string => `Deal ${stackCount} damage when Deep wounds is applied`,
    strength: (): string => 'Deal 25% more damage',
    weakness: (): string => 'Deal 25% less damage',
    damageUp: (stackCount: number): string => `Deal ${stackCount} more damage`,
    damageDown: (stackCount: number): string => `Deal ${stackCount} less damage`,
    reinforcedArmor: (): string => 'Receive 25% less damage from spells',
    brokenArmor: (): string => 'Receive 25% more damage from spells',
    defenceUp: (stackCount: number): string => `Receive ${stackCount} less damage from spells`,
    defenceDown: (stackCount: number): string => `Receive ${stackCount} more damage from spells`
}