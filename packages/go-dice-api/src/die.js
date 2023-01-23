import EventEmitter from "./event-emitter.js";

// @ts-ignore
let GoDice = window.GoDice;

export default class Die extends EventEmitter {
  static Color = {
    0: "Black",
    1: "Red",
    2: "Green",
    3: "Blue",
    4: "Yellow",
    5: "Orange",
  };

  #id = undefined;
  #color = undefined;

  constructor(id, instance) {
    super();
    this.#id = id;
    this.#color = undefined;
    this.instance = instance;
    this.connected = instance.bluetoothDevice.gatt.connected;

    this.on("stable", (value) => this.onValue(value));
    this.on("moveStable", ([value, xyzAccRaw]) => {
      this.onValue(value);
      this.onAccRaw(xyzAccRaw);
    });
    this.on("fakeStable", ([value, xyzAccRaw]) => {
      this.onValue(value);
      this.onAccRaw(xyzAccRaw);
    });
    this.on("tiltStable", ([value, xyzAccRaw]) => {
      this.onValue(value);
      this.onAccRaw(xyzAccRaw);
    });
    this.on("disconnected", () => this.onDisconnect());
  }

  get id() {
    return this.#id;
  }

  onValue(value) {
    this.emit("value", value);
  }

  onAccRaw(xyzAccRaw) {
    this.emit("accRaw", xyzAccRaw);
  }

  disconnect() {
    this.instance.bluetoothDevice.gatt.disconnect();
  }

  onDisconnect() {
    this.connected = false;
  }

  async reconnect() {
    await this.instance.attemptReconnect();
  }

  getBatteryLevel() {
    return new Promise((resolve) => {
      if (!this.connected) {
        return 0;
      }

      const onBatteryLevel = (level) => {
        resolve(level);
        this.off("batteryLevel", onBatteryLevel);
      };

      this.on("batteryLevel", onBatteryLevel);
      this.instance.getBatteryLevel();
    });
  }

  getColor() {
    return new Promise((resolve) => {
      if (this.#color) {
        return resolve(this.#color);
      }

      const onColor = (color) => {
        this.#color = Die.Color[color];
        resolve(this.#color);
        this.off("color", onColor);
      };

      this.on("color", onColor);
      this.instance.getDiceColor();
    });
  }

  setLed(led1, led2) {
    if (!led2) {
      led2 = led1;
    }

    this.instance.setLed(led1, led2);
  }

  pulseLed(pulseCount, onTime, offTime, RGB) {
    this.instance.pulseLed(pulseCount, onTime, offTime, RGB);
  }

  setDieType(dieType) {
    this.instance.setDieType(GoDice.diceTypes[dieType]);
  }
}
