#!/usr/bin/env node
const program = require('commander');
const AnneKeyboard = require('../index');

const anne = new AnneKeyboard();

const error = (...s) => console.error(...s);

program
  .command('lighting <mode>')
  .alias('l')
  .description('sets the keyboard lighting effect')
  .option('-s, --speed <speed>', 'sets the effect speed')
  .option('-b, --brightness <brightness>', 'sets the effect brightness')
  .action((mode, options) => {
    let effect;

    anne.connect().then(kb => {
      const modes = Object.keys(AnneKeyboard.LightingModes);
      const effects = modes.filter(m => m.toLowerCase().startsWith(mode.toLowerCase()));

      if (effects.length < 1) {
        throw new Error(
          `Could not find effect ${mode}. ` +
          'Valid effects: ' + modes.join(', '));
      }

      if (effects.length > 1) {
        throw new Error('More than one effect matched: ' + effects.join(', '));
      }

      effect = effects[0];
      return kb.setLightingMode(AnneKeyboard.LightingModes[effect]);
    }).then(_data => {
      if (options.speed || options.brightness) {
        // TODO
      }
      console.log('Lighting effect', effect, 'set');
      process.exit(0);
    }).catch(err => {
      error(err.toString());
      process.exit(1);
    });
  });

program
  .command('layout <name>')
  .alias('lt')
  .description('sets the keyboard layout')
  .action(name => {
    let layout;
    anne.connect().then(kb => {
      const names = Object.keys(AnneKeyboard.Layouts);
      const layouts = names.filter(n => n.toLowerCase().indexOf(name.toLowerCase()) > -1);

      if (layouts.length < 1) {
        throw new Error(
          `Could not find layout ${name}. ` +
          'Valid layouts: ' + names.join(', '));
      }

      if (layouts.length > 1) {
        throw new Error('More than one layout matched: ' + layouts.join(', '));
      }

      layout = layouts[0];
      return kb.setLayout(AnneKeyboard.Layouts[layout]);
    }).then(_data => {
      console.log('Layout', layout, 'set');
      process.exit(0);
    }).catch(err => {
      error(err.toString());
      process.exit(1);
    });
  });


if (process.argv.length && process.argv.length < 3) {
  // eslint-disable-next-line no-console
  console.log(program.helpInformation());
  process.exit(0);
} else {
  program.parse(process.argv);
}
