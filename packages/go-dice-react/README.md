# GoDice for React

This package provides some hooks for interfacing with GoDice using the [go-dice-api] library.

[go-dice-api]: https://www.npmjs.com/package/go-dice-api

## Install

1. Follow `go-dice-api`'s [install instructions](https://www.npmjs.com/package/go-dice-api#install):
2. Install via NPM or Yarn 

```shell
npm install go-dice-api go-dice-react
# or
yarn add go-dice-api go-dice-react
```

## Hooks

```tsx
import { useDieColor } from 'go-dice-react';

function App () {
  // Get a list of connected dice, and a function to request a die to be added
  const [dice, requestDie] = useDiceSet(); 

  return (
    <div>
      <div><Button onClick={() => requestDie()}>Add Die</Button></div>
      {dice.map(die => (
        <DieDisplay key={die.id} die={die} />
      ))}
    </div>
  )
}

function DieDisplay ({ die }) {
  // Get the color of a die
  const color: string = useDieColor(die);
  
  // Check if the user is rolling the die
  const rolling: boolean = useRolling(die);
  
  // Get the value of the die
  const value: number = useDieValue(die); 
  
  // Get battery level of the die
  const batteryLevel: number = useBatteryLevel(die); // value: 0-100
  
  return (
    <div>
      {color}: {rolling ? "..." : value} 
      [{batteryLevel}%]
    </div>
  )
}
```
