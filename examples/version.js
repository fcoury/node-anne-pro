const AnneProKeyboard = require('../index');

new AnneProKeyboard().connect().then(kb => {
  return kb.getKeyboardId();
}).then(version => {
  console.log('version', version);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
