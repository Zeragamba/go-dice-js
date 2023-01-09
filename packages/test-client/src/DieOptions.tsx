import { FC } from 'react';
import { Die, LED_OFF, LedColor } from 'go-dice-api';
import { useBatteryLevel, useDieColor, useDieValue, useRolling } from 'go-dice-react';

interface DieProps {
  die: Die;
}

export const DieOptions: FC<DieProps> = ({
  die,
}) => {
  const color = useDieColor(die);
  const rolling = useRolling(die);
  const value = useDieValue(die);
  const batteryLevel = useBatteryLevel(die);

  const onLedOn = (die: Die) => {
    die.setLed(LedColor.BLUE);
  };

  const onLedOff = (die: Die) => {
    die.setLed(LED_OFF);
  };

  return (
    <div style={{ padding: '1em', border: '1px solid grey' }}>
      <div style={{ background: color || 'lightgrey', padding: '1em', margin: '8px 0' }}>
        Colour: {color}
      </div>

      <div style={{ background: 'lightgrey', padding: '1em', margin: '8px 0' }}>
        Value: {rolling ? 'ROLLING' :
        value}
      </div>

      <div
        style={{
          position: 'relative',
          padding: '1em',
          margin: '0 8px',
        }}
      >
        <div
          style={{
            position: 'relative',
            zIndex: 10,
          }}
        >
          Battery: {batteryLevel}%
        </div>
        <div
          style={{
            zIndex: 0,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            background: 'lightgrey',
            width: `${batteryLevel}%`,
          }}
        />
      </div>

      <div
        style={{ border: '2px solid black', padding: '1em', margin: '8px 0' }}
        onClick={() => onLedOn(die)}
      >
        Light On
      </div>

      <div
        style={{ border: '2px solid black', padding: '1em', margin: '8px 0' }}
        onClick={() => onLedOff(die)}
      >
        Lights Off
      </div>
    </div>
  );
};
