# node-anne-pro

[![npm version](https://badge.fury.io/js/anne-pro.svg)](https://badge.fury.io/js/anne-pro)

> Node.js 8 library for interacting with the Anne Pro keyboard

**IMPORTANT**: currently it only works in macOS

Current Features:

- set keyboard lighting mode

Roadmap:

- [ ] Layouts
- [ ] Macros

## Install

```bash
npm install anne-pro
```

## Usage

```javascript
const AnneProKeyboard = require('../index');

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
