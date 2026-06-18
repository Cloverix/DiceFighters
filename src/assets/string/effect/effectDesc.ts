export const EffectDesc = {
    burn: (stackCount: number): string => `Deal ${stackCount} damage at the start of turn, them decrease burn by 1`,
    stun: (): string => 'Skip its next turn',
    wet: (): string => "It's wet"
}