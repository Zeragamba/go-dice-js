# GoDice JavaScript API Wrapper

This package is a work in progress. Trying to wrap the API to support TypeScript
and a nicer API interface.

Due to licensing reasons... this package doesn't actually contain the API, and must
be downloaded from the official repo: https://github.com/ParticulaCode/GoDiceJavaScriptAPI

## Overview:

This supports the following features of the GoDice API:

- Connecting to dice
- Reading the value of the dice
- Setting LED colors
- Getting the battery level
- Getting the colour of the die
- React hooks (via [go-dice-react](https://www.npmjs.com/package/go-dice-react))

Future features:

- Hex support for LEDs
- Self implemented API
- RPG Dice Shell support

## Support

Requires the Bluetooth Browser APIs, which are only available in Chrome and
Chromium based browsers at time of writing.

Check [MDN's browser support](mdn-bluetooth) page for up-to-date info

[mdn-bluetooth]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Bluetooth_API#browser_compatibility

## Install

```
# install from NPM
npm install go-dice-api

# or with yarn if that's your cup-o-tea:
yarn add go-dice-api
```

Add the Official API to the page

```html

<head>
    <script src="/path/to/godice.js"></script>

    <!-- Export the API so the module file can find it -->
    <script>window.GoDice = GoDice</script>

    <script src="/path/to/bundle.js"></script>
</head>
```

## Usage

```ts
import { diceSet, Die, LED_OFF } from 'go-dice-api'

// Ask the user to connect a die
diceSet.requestDie()

diceSet.on('connected', (die: Die) => {
  // a die was connected!

  // Set the colour of the leds
  die.setLed([0, 0, 255]) // [Red, Green, Blue]
  die.setLed([0, 0, 255], [255, 0, 0]) // Set the two lights separately 
  die.setLed(LED_OFF)

  // Listen for the user to start rolling the dice
  die.on('rollStart', () => console.log("Rolling..."))

  // And then get the value they rolled
  die.on('value', (value: number) => console.log(`You rolled a ${value}`))

  // Actively request the battery level
  die.getBatteryLevel().then((level: number) => console.log(level))

  // Passively listen for the battery level
  die.on('batteryLevel', (level: number) => console.log(`Battery: ${level}%`)) // level: 0-100

  // Request the colour of the Die
  die.getColour().then((color: string) => console.log(color))
})
```
