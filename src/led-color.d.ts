export type LedRgb = [red: number, green: number, blue: number];
export type LedOff = [0]

const LedColor = {
  OFF: LedOff,
  RED: LedRgb,
  GREEN: LedRgb,
  BLUE: LedRgb,
};

export default LedColor;
