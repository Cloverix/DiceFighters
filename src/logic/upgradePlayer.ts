import {type GameState, GameStateBuilder} from "../type/gameState/GameState.ts";
import {HP_PER_UPGRADE} from "../assets/constants/numericConstants.ts";

/**
 * Handles upgrading the player after winning in a battle. To be called in win in the battle,
 * @param state - current GameState
 * @return - updated GameState
 */
export function upgradePlayer(state: GameState): GameState {
    const oldMaxHp = state.player.maxHp;
    return new GameStateBuilder(state)
        .setMaxHp('player', oldMaxHp + HP_PER_UPGRADE)
        .build();
}