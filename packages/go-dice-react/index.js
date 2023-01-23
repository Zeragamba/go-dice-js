import { useEffect, useState } from "react";
import { diceSet, LED_OFF, LedColor } from "go-dice-api";

export function useDiceSet() {
  const [dice, setDice] = useState([]);

  useEffect(() => {
    const onDieConnected = (die) => {
      setDice((dice) => [...dice, die]);
      die.pulseLed(2, 50, 50, LedColor.BLUE);
    };

    diceSet.on("connected", onDieConnected);

    return () => diceSet.off("connected", onDieConnected);
  }, []);

  function removeDie(dieId) {
    setDice(dice.filter((die) => die.id !== dieId));
  }

  return [dice, diceSet.requestDie, removeDie];
}

export function useDieColor(die) {
  const [color, setColor] = useState();

  useEffect(() => {
    die.getColor().then((color) => {
      setColor(color);
    });
  });

  return color;
}

export function useRolling(die) {
  const [rolling, setRolling] = useState(false);

  useEffect(() => {
    const onStable = () => setRolling(false);
    const onRollStart = () => setRolling(true);

    die.on("value", onStable);
    die.on("rollStart", onRollStart);

    return () => {
      die.off("value", onStable);
      die.off("rollStart", onRollStart);
    };
  }, [die]);

  return rolling;
}

export function useDieValue(die) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const onStable = (value) => setValue(value);
    die.on("value", onStable);
    return () => die.off("value", onStable);
  }, [die]);

  return value;
}

export function useAccRaw(die) {
  const [xyz, setRaw] = useState([0, 0, 0]);

  useEffect(() => {
    const onAccRaw = (xyz) => setRaw(xyz);
    die.on("accRaw", onAccRaw);
    return () => die.off("accRaw", onAccRaw);
  }, [die]);

  return xyz;
}

export function useBatteryLevel(die, interval = 1000) {
  const [level, setLevel] = useState(100);

  useEffect(() => {
    const onLevel = (level) => setLevel(level);
    die.on("batteryLevel", onLevel);

    // Request the level on a regular interval
    const reqLevel = () => die.getBatteryLevel();
    const timerId = window.setInterval(reqLevel, interval);

    return () => {
      window.clearInterval(timerId);
      die.off("batteryLevel", onLevel);
    };
  }, [die, interval]);

  return level;
}

export function useConnectionStatus(die) {
  const [connected, setConnection] = useState(true);

  useEffect(() => {
    die.on("connected", () => setConnection(true));
    die.on("disconnected", () => setConnection(false));

    return () => {
      die.off("connected", () => setConnection(true));
      die.off("disconnected", () => setConnection(false));
    };
  });

  return connected;
}
