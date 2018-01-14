# node-anne-pro

[![npm version](https://badge.fury.io/js/anne-pro.svg)](https://badge.fury.io/js/anne-pro)

> Node.js 8 library for interacting with the Anne Pro keyboard

**IMPORTANT**: only works in macOS currently

Current Features:

- set lighting mode
- set lighting mode speed and brightness
- set layout

Roadmap:

- [ ] Macros

## Install

```bash
npm install anne-pro
```

Or if you want to use the command line utility:

```bash
npm install -g anne-pro
```

## Usage

### As a Command Line application

```text

$ anne
  Usage:  [options] [command]

  Options:
    -h, --help  output usage information

  Commands:
    lighting|l [options] <mode>  sets the keyboard lighting effect
    layout|lt <name>             sets the keyboard layout

$ anne lighting rai
Lighting effect Rainbow set

$ anne layout arr
Layout WindowsArrows set
```

### As a Library

```javascript
const AnneProKeyboard = require('anne-pro');

new AnneProKeyboard().connect().then(kb => {
  console.log('setting Rainbow effect');
  kb.setLightingMode(AnneProKeyboard.LightingModes.Rainbow);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
```

## Credits

This library relies on a modified version of [Sandeep Mistry](https://github.com/sandeepmistry)'s [node-core-bluetooth](https://github.com/sandeepmistry/node-core-bluetooth) library that can be found [here](https://github.com/fcoury/node-core-bluetooth).

The code is written based on the Swift code written by [Michiel Visser](https://github.com/msvisser) for the [AnnePro-mac](https://github.com/msvisser/AnnePro-mac) app, which is awesome!

## License

[MIT](http://vjpr.mit-license.org)
