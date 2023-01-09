import { FC } from 'react';
import { Die } from 'go-dice-api';
import { useDieColor, useDieValue, useRolling } from 'go-dice-react';

interface DieValueProps {
  die: Die;
}

export const DieValue: FC<DieValueProps> = ({
  die,
}) => {
  const color = useDieColor(die);
  const value = useDieValue(die);
  const rolling = useRolling(die);

  const styles = {
    height: 50,
    width: 50,
    background: color || 'lightgrey',
    display: 'inline-grid',
    alignContent: 'center',
    justifyContent: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  };

  return (
    <div style={styles}>
      {rolling ? '...' : value}
    </div>
  );
};
