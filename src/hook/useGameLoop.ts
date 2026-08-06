import { useCallback, useReducer } from "react";
import { equipSpell } from "../logic/equipSpell.ts";
import { takeTurn } from "../logic/takeTurn.ts";
import { unequipSpell } from "../logic/unequipSpell.ts";
import {
  GameStateBuilder,
  type GameState,
  type Target,
} from "../type/gameState/GameState.ts";
import type { Spell } from "../type/spell/Spell.ts";
import type { EquipMoveData } from "./useInventoryDrag.ts";

type GameLoopAction =
  | { kind: "UpdateRollResults"; rollResults: Map<number, number>; target: Target }
  | { kind: "TakeTurn" }
  | { kind: "EndBattle" }
  | { kind: "equipSpell", spell: Spell, moveData: EquipMoveData }
  | { kind: "unequipSpell", spell: Spell, diceIndex: number, slot: number }
  | { kind: "addToInventory", spell: Spell}

function gameLoopReducer(
  prevState: GameState,
  action: GameLoopAction,
): GameState {
  switch (action.kind) {
    case "UpdateRollResults": {
      return new GameStateBuilder(prevState)
        .setRollResults(action.rollResults, action.target)
        .build();
    }
    case "TakeTurn": {
      return takeTurn(prevState);
    }
    case "EndBattle": {
      return prevState; //TODO: add a function that handles after-battle actions (upgrades, etc.)
    }
    case "equipSpell": {
      return equipSpell(prevState, action.spell, action.moveData);
    }
    case "unequipSpell": {
      return unequipSpell(prevState, action.spell, action.diceIndex, action.slot);
    }
    case "addToInventory": {
      return new GameStateBuilder(prevState)
      .addSpellToInventory(action.spell)
      .setBattleStatus('ongoing')
      .build();
    }
  }
}

export function useGameLoop(initialState: GameState) {
  const [state, dispatch] = useReducer(gameLoopReducer, initialState);

  const updateRollResults = useCallback((results: Map<number, number>, target: Target) => {
    dispatch({
      kind: "UpdateRollResults",
      rollResults: results,
      target: target,
    });
  }, []);

  const handleTakeTurn = useCallback(() => {
    dispatch({ kind: "TakeTurn" });
  }, []);

  const handleEndBattle = useCallback(() => {
    dispatch({ kind: "EndBattle" });
  }, []);

  const handleEquipSpell = useCallback((spell: Spell, moveData: EquipMoveData) => {
    dispatch({kind: "equipSpell", spell: spell, moveData: moveData});
  }, []);

  const handleUnequipSpell = useCallback((spell: Spell, diceIndex: number, slot: number) => {
    dispatch({kind: "unequipSpell", spell: spell, diceIndex: diceIndex, slot: slot});
  }, []);

  const handleAddToInventory = useCallback((spell: Spell) => {
    dispatch({kind: "addToInventory", spell: spell});
  }, []); 

  return {
    state,
    updateRollResults,
    handleTakeTurn,
    handleEndBattle,
    handleEquipSpell,
    handleUnequipSpell,
    handleAddToInventory
  };
}
