import { useDiceSet } from 'go-dice-react';
import { DieOptions } from './DieOptions';
import { DieValue } from './DieValue';

function App () {
  const [dice, requestDie] = useDiceSet();

  const onAddDie = () => requestDie();

  return (
    <div>
      Dice:
      <div style={{ padding: '1em', border: '1px solid grey' }} onClick={onAddDie}>
        ADD DIE
      </div>
      {dice.map(die => <DieValue key={die.id} die={die} />)}
      {dice.map(die => <DieOptions key={die.id} die={die} />)}
    </div>
  );
}

export default App;
