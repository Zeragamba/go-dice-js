export type LedRgb = [red: number, green: number, blue: number];
export type LedOff = [0];
export type LedColorType = LedOff | LedRgb;

export type DefaultLedColors = {
  OFF: LedOff,
  RED: LedRgb,
  GREEN: LedRgb,
  BLUE: LedRgb,
};

declare const LedColor: DefaultLedColors;

export default LedColor;
