const $ = require('nodobjc');

$.framework('CoreBluetooth');
$.framework('IOBluetooth');

const ANNE_PRO_SERVICE_UUID = $('f000ffc0-0451-4000-b000-000000000000');
const ANNE_PRO_READ_UUID = $('f000ffc1-0451-4000-b000-000000000000');
const ANNE_PRO_WRITE_UUID = $('f000ffc2-0451-4000-b000-000000000000');

const CentralManager = $.CBCentralManager('alloc');
const CBUUID = $.CBUUID('alloc');
const anneProServiceCBUUID = CBUUID('initWithString', ANNE_PRO_SERVICE_UUID);
console.log('anneProServiceCBUUID', anneProServiceCBUUID);

const CBCentralManagerDelegate = $.NSObject.extend('CBCentralManagerDelegate');

CBCentralManagerDelegate.addMethod('centralManagerDidUpdateState:', 'v@:@', function ($self, $_cmd, $centralManager) {
  console.log('stateUpdate', arguments);
});

CBCentralManagerDelegate.addMethod('centralManager:didDiscoverPeripheral:advertisementData:RSSI:',
                                    'v@:@@@@', function ($self, $_cmd, $centralManager, $peripheral, $advertisementData, $RSSI) {
  console.log('didDiscoverPeripheral', arguments);
});

CBCentralManagerDelegate.addMethod('centralManager:didConnectPeripheral:',
                                    'v@:@@', function ($self, $_cmd, $centralManager, $peripheral) {
  console.log('didConnectPeripheral', arguments);
});

const delegate = CBCentralManagerDelegate('alloc')('init');
const centralManager = CentralManager('initWithDelegate', delegate, 'queue', null);
console.log('delegate', delegate);
console.log('delegate', centralManager('delegate'));

const array = $.NSMutableArray('alloc')('init');
array('addObject', anneProServiceCBUUID);

const peripherals = centralManager('retrieveConnectedPeripheralsWithServices', array);
const count = peripherals('count');

if (count < 1) {
  console.log('No Anne Pro found');
  process.exit(1);
}

const peripheral = peripherals('objectAtIndex', 0);
console.log('peripheral', peripheral);
// console.log('services', peripheral('services'));
peripheral('discoverServices:');
// console.log('peripheral.methods()', peripheral.methods());
// peripheral('discoverCharacteristics:forService:', )
// centralManager('connectPeripheral', peripheral, 'options', null);
// console.log('CBCentralManagerDelegate', CBCentralManagerDelegate);
// setTimeout(() => console.log('done'), 30000);
