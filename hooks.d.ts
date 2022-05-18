import { Die } from 'go-dice-api';

export function useDieColor (die: Die): string;
export function useRolling (die: Die): boolean;
export function useDieValue (die: Die): number;
export function useBatteryLevel (die: Die): number;
