const AnneProKeyboard = require('../index');

new AnneProKeyboard().connect().then(kb => {
  console.log('setting Rainbow effect');
  kb.setLightingMode(AnneProKeyboard.LightingModes.Rainbow);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
