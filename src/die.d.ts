import EventEmitter from './event-emitter';
import { LedColour } from './led';

export default class Die extends EventEmitter {
  readonly id: string;

  new (id: string)

  on (event: 'rollStart', handler: () => void): void
  on (event: 'stable', handler: (value: number) => void): void
  on (event: 'value', handler: (value: number) => void): void
  on (event: 'fakeStable', handler: (value: number) => void): void
  on (event: 'moveStable', handler: (value: number) => void): void
  on (event: 'disconnected', handler: () => void): void

  emit (event: 'rollStart'): void
  emit (event: 'stable', value: number): void
  emit (event: 'fakeStable', value: number): void
  emit (event: 'moveStable', value: number): void
  emit (event: 'disconnected'): void

  getBatteryLevel (): Promise<number>

  getColour (): Promise<number>

  setLed (led1: LedColour, led2: LedColour): void
}
