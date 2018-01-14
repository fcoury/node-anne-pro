const AnneProKeyboard = require('../index');

new AnneProKeyboard().connect().then(kb => {
  // sets the rain effect
  console.log('setting Rainbow effect');
  kb.setLightingMode(AnneProKeyboard.LightingModes.Rainbow);
  process.exit(0);
});
