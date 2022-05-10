import EventEmitter from './event-emitter';
import Die from './die';

declare const GoDice: any;

export default class DiceSet extends EventEmitter {
  requestDie (): void

  on (event: 'connected', handler: (die: Die) => void)
}
