const AnneProKeyboard = require('../index');

new AnneProKeyboard().connect().then(kb => {
  return kb.getMacro(2);
}).then(data => {
  console.log('data', data);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
