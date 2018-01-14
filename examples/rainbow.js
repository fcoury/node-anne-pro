const AnneProKeyboard = require('../index');

let kb;

new AnneProKeyboard().connect().then(_kb => {
  kb = _kb;
  return kb.getLightingMode();
}).then(mode => {
  console.log('current lighting mode is', mode.name);
  return kb.setLightingMode(AnneProKeyboard.LightingModes.Rainbow);
}).then(_ => {
  kb.setLightingSettings(100, 10);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
