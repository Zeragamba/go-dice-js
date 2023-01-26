import { DiceSet, Die } from "go-dice-api";

export function useDiceSet(): [
  dice: Die[],
  requestDie: DiceSet["requestDie"],
  removeDie: (dieId: string) => void
];

export function useDieColor(die: Die): string;

export function useRolling(die: Die): boolean;

export function useDieValue(die: Die): string;

export function useAccRaw(die: Die): [X: number, Y: number, Z: number];

export function useBatteryLevel(die: Die): number;

export function useConnectionStatus(die: Die): boolean;
