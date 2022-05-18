const EventEmitter = require('./event-emitter');
const LedColor = require('./led-color');

class Die extends EventEmitter {
  static LED_OFF = LedColor.OFF;

  static Color = {
    0: 'Black',
    1: 'Red',
    2: 'Green',
    3: 'Blue',
    4: 'Yellow',
    5: 'Orange',
  };

  #id = undefined;
  #color = undefined;

  constructor (id, instance) {
    super();
    this.#id = id;
    this.#color = undefined;
    this.instance = instance;

    this.on('stable', (value) => this.onValue(value));
    this.on('moveStable', (value) => this.onValue(value));
    this.on('fakeStable', (value) => this.onValue(value));
  }

  get id () {
    return this.#id;
  }

  onValue (value) {
    this.emit('value', value);
  }

  getBatteryLevel () {
    return new Promise(resolve => {
      const onBatteryLevel = (level) => {
        resolve(level);
        this.off('batteryLevel', onBatteryLevel);
      };

      this.on('batteryLevel', onBatteryLevel);
      this.instance.getBatteryLevel();
    });
  }

  getColor () {
    return new Promise(resolve => {
      if (this.#color) {
        return resolve(this.#color);
      }

      const onColor = (color) => {
        this.#color = Die.Color[color];
        resolve(this.#color);
        this.off('color', onColor);
      };

      this.on('color', onColor);
      this.instance.getDiceColor();
    });
  }

  setLed (led1, led2) {
    if (!led2) {
      led2 = led1;
    }

    this.instance.setLed(led1, led2);
  }
}

module.exports = Die;
