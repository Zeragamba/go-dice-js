if (!window.GoDice) {
  throw Error(
    'GoDice API not found.\n' +
    'Please grab a copy of it from the official repo:\n' +
    '\tOfficial GoDice API: https://github.com/ParticulaCode/GoDiceJavaScriptAPI\n' +
    'and add it to the window object:\n' +
    '\t`window.GoDice = GoDice`',
  );
}

const EventEmitter = require('./event-emitter');
const Die = require('./die');

GoDice = window.GoDice;

class DiceSet extends EventEmitter {
  dice = {};

  requestDie () {
    new GoDice().requestDevice();
  }
}

const diceSet = new DiceSet();
module.exports = diceSet;

GoDice.prototype.onDiceConnected = (dieId, diceInstance) => {
  if (diceSet.dice[dieId]) {
    const die = diceSet.dice[dieId];
    die.instance = diceInstance;
    diceSet.emit('reconnected', die);
  } else {
    const die = new Die(dieId, diceInstance);
    diceSet.dice[dieId] = die;
    diceSet.emit('connected', die);
  }

};

GoDice.prototype.onRollStart = (dieId) => {
  diceSet.dice[dieId].emit('rollStart');
};

GoDice.prototype.onBatteryLevel = (dieId, batteryLevel) => {
  diceSet.dice[dieId].emit('batteryLevel', batteryLevel);
};

GoDice.prototype.onDiceColor = (dieId, color) => {
  diceSet.dice[dieId].emit('color', color);
};

GoDice.prototype.onStable = (dieId, value) => {
  diceSet.dice[dieId].emit('stable', value);
};

GoDice.prototype.onFakeStable = (dieId, value) => {
  diceSet.dice[dieId].emit('fakeStable', value);
};

GoDice.prototype.onMoveStable = (dieId, value) => {
  diceSet.dice[dieId].emit('moveStable', value);
};
