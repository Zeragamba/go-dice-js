const { useEffect, useState } = require('react');
const { diceSet, LED_OFF, LedColor } = require('go-dice-api');

module.exports = {
  useDiceSet () {
    const [dice, setDice] = useState([]);

    useEffect(() => {
      const onDieConnected = (die) => {
        setDice(dice => [...dice, die]);
        die.setLed(LedColor.BLUE);

        setTimeout(() => {
          die.setLed(LED_OFF);
        }, 5000);
      };

      diceSet.on('connected', onDieConnected);

      return () => diceSet.off('connected', onDieConnected);
    }, []);

    return [dice, diceSet.requestDie];
  },

  useDieColor (die) {
    const [color, setColor] = useState();

    useEffect(() => {
      die.getColor().then(color => setColor(color));
    }, [die]);

    return color;
  },

  useRolling (die) {
    const [rolling, setRolling] = useState(false);

    useEffect(() => {
      const onStable = () => setRolling(false);
      const onRollStart = () => setRolling(true);

      die.on('value', onStable);
      die.on('rollStart', onRollStart);

      return () => {
        die.off('value', onStable);
        die.off('rollStart', onRollStart);
      };
    }, [die]);

    return rolling;
  },

  useDieValue (die) {
    const [value, setValue] = useState(0);

    useEffect(() => {
      const onStable = (value) => setValue(value);
      die.on('value', onStable);
      return () => die.off('value', onStable);
    }, [die]);

    return value;
  },

  useBatteryLevel (die, interval = 1000) {
    const [level, setLevel] = useState(100);

    useEffect(() => {
      const onLevel = (level) => setLevel(level);
      die.on('batteryLevel', onLevel);

      // Request the level on a regular interval
      const reqLevel = () => die.getBatteryLevel();
      const timerId = window.setInterval(reqLevel, interval);

      return () => {
        window.clearInterval(timerId);
        die.off('batteryLevel', onLevel);
      };
    }, [die, interval]);

    return level;
  },
};
