# WIP - GoDice JavaScript API Wrapper

This package is a work in progress. Trying to wrap the API to support TypeScript
and a nicer API interface.

Due to licensing reasons... this package doesn't actually contain the API, and must
be downloaded from the official repo: https://github.com/ParticulaCode/GoDiceJavaScriptAPI

## Overview:

Still very much a work in progress. Currently, this features:

- Connecting dice
- Reading the value of the dice
- Setting LED colors.
- Annnd... that's it so far. Yep... *exciting*

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
import { diceSet, Die, Led } from 'go-dice-api'

// Ask the user to connect a die
diceSet.requestDie()

diceSet.on('connected', (die: Die) => {
  // a die was connected!

  // Set the colour of the leds
  die.setLed([0, 0, 255], [0, 0, 255])

  // Annnd turn them off
  die.setLed(Led.Color.OFF, Led.Color.OFF)

  die.on('rollStart', () => {
    console.log("Rolling...")
  })

  die.on('value', (value: number) => {
    console.log(`You rolled a ${value}`)
  })
})
```
