const AnneProKeyboard = require('../index');

function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

async function main() {
  const kb = await (new AnneProKeyboard().connect());
  const macros = [];
  while (true) {
    const macro = await kb.getMacro(macros.length);
    if (!macro) { break; }
    console.log('macro', macro);
    macros.push(macro);
    await sleep(500);
  }
  process.exit(0);
}

main();
