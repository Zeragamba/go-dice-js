const { useEffect, useState } = require('react');

function useDieColor (die) {
  const [color, setColor] = useState();

  useEffect(() => {
    die.getColor().then(color => setColor(color));
  }, [die]);

  return color;
}

function useRolling (die) {
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
}

function useDieValue (die) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const onStable = (value) => setValue(value);
    die.on('value', onStable);
    return () => die.off('value', onStable);
  }, [die]);

  return value;
}

function useBatteryLevel (die, interval = 1000) {
  const [level, setLevel] = useState < number > (100);

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
}

module.exports = {
  useDieColor,
  useRolling,
  useDieValue,
  useBatteryLevel,
};
