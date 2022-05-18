import EventEmitter from './event-emitter';
import { LedColour } from './led-color';

enum Color {
  0 = 'Black',
  1 = 'Red',
  2 = 'Green',
  3 = 'Blue',
  4 = 'Yellow',
  5 = 'Orange'
}

type DieInstance = {
  getBatteryLevel (): void
  getDiceColor (): void
  setLed (led1: LedColour, led2: LedColour): void
}

export default class Die extends EventEmitter {
  static Color: Color;

  readonly id;

  new (id: string, instance: DieInstance)

  on (event: 'rollStart', handler: () => void): void
  on (event: 'stable', handler: (value: number) => void): void
  on (event: 'value', handler: (value: number) => void): void
  on (event: 'fakeStable', handler: (value: number) => void): void
  on (event: 'moveStable', handler: (value: number) => void): void
  on (event: 'batteryLevel', handler: (level: number) => void): void
  on (event: 'color', handler: (colourId: number) => void): void
  on (event: 'disconnected', handler: () => void): void

  getBatteryLevel (): Promise<number>

  getColor (): Promise<Color>

  setLed (color: LedColour): void
  setLed (color1: LedColour, color2: LedColour): void
}
