const EventEmitter = require('./event-emitter');

class Die extends EventEmitter {
  constructor (id, instance) {
    super();
    this._id = id;
    this.instance = instance;

    this.on('stable', (value) => this.onValue(value));
    this.on('moveStable', (value) => this.onValue(value));
    this.on('fakeStable', (value) => this.onValue(value));
  }

  get id () {
    return this._id;
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
    });
  }

  getColor () {
    return new Promise(resolve => {
      const onColor = (color) => {
        resolve(color);
        this.off('color', onColor);
      };

      this.on('color', onColor);
    });
  }

  setLed (led1, led2) {
    this.instance.setLed(led1, led2);
  }
}

module.exports = Die;
