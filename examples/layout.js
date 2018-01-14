const AnneProKeyboard = require('../index');

new AnneProKeyboard().connect().then(kb => {
  console.log('setting Custom layout');
  kb.setLayout(AnneProKeyboard.Layouts.Custom);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
