import type {GameState} from "../type/gameState/GameState.ts";
import {useCallback, useEffect, useReducer} from "react";
import {takeTurn} from "../logic/takeTurn.ts";
import {checkWinCondition} from "../logic/checkWinCondition.ts";

type GameLoopAction =
    | {kind: 'TakeTurn'}
    | {kind: 'EndBattle'}

function gameLoopReducer(prevState: GameState, action: GameLoopAction): GameState {
    switch (action.kind) {
        case 'TakeTurn': {
            return takeTurn(prevState);
        }
        case 'EndBattle': {
            return prevState//TODO: add a function that handles after-battle actions (upgrades, etc.)
        }
    }
}

export function useGameLoop(initialState: GameState) {
    const [state, dispatch] = useReducer(gameLoopReducer, initialState);

    const handleTakeTurn = useCallback(() => {
        dispatch({kind: 'TakeTurn'});
    }, []);

    const handleEndBattle = useCallback(() => {
        dispatch({kind: 'EndBattle'});
    }, []);

    useEffect(() => {
        if (state.currentTurn === 'enemy' && !checkWinCondition(state)) {
            const timerId = setTimeout(() => handleTakeTurn(), 1000);
            return () => clearTimeout(timerId)
        }
    }, [state.currentTurn, handleTakeTurn])

    return {state, handleTakeTurn, handleEndBattle};
}