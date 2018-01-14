const AnneProKeyboard = require('../index');

let kb;

new AnneProKeyboard().connect().then(_kb => {
  kb = _kb;
  return kb.getLayout();
}).then(layout => {
  console.log('current layout is', layout.name);
  console.log('setting Custom layout');
  return kb.setLayout(AnneProKeyboard.Layouts.Custom);
}).then(_ => {
  return kb.getLayout();
}).then(layout => {
  console.log('new layout is', layout.name);
  process.exit(0);
}).catch(error => {
  console.log(error.toString());
  process.exit(1);
});
