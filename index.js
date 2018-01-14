const { EventEmitter } = require('events');
const { CentralManager, Peripheral, CharacteristicWriteType } = require('core-bluetooth');

const ANNE_PRO_SERVICE_UUID = "F000FFC0-0451-4000-B000-000000000000";
const ANNE_PRO_READ_UUID = "F000FFC1-0451-4000-B000-000000000000";
const ANNE_PRO_WRITE_UUID = "F000FFC2-0451-4000-B000-000000000000";

class AnneProKeyboard extends EventEmitter {
  connect() {
    this.centralManager = new CentralManager();
    this.centralManager.on('stateUpdate', this.statusUpdated.bind(this));
    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  setLightingMode(mode) {
    this.writeMessage([9, 2, 1, mode]);
  }

  getService(uuid) {
    this.log('this.services.map(s => s.uuid)', this.services.map(s => s.uuid));
    return this.services.find(s => s.uuid === uuid);
  }

  get mainService() { return this.getService(ANNE_PRO_SERVICE_UUID); }

  getCharacteristic(uuid) {
    return this.characteristics.find(c => c.uuid === uuid);
  }

  get readCharacteristic() { return this.getCharacteristic(ANNE_PRO_READ_UUID); }
  get writeCharacteristic() { return this.getCharacteristic(ANNE_PRO_WRITE_UUID); }

  writeMessage(data) {
    this.peripheral.writeValueForCharacteristic(Buffer.from(data), this.writeCharacteristic, 0);
  }

  // events
  statusUpdated(status) {
    this.log('statusUpdated', status);
    if (status !== 'poweredOn') { return; }

    const connectedPeripherals = this.centralManager.retrieveConnectedPeripherals([ANNE_PRO_SERVICE_UUID]);
    if (connectedPeripherals.length) {
      this.peripheral = connectedPeripherals[0];
      this.peripheral.on('connect', this.keyboardConnected.bind(this));
      this.peripheral.on('servicesDiscover', this.servicesDiscovered.bind(this));
      this.centralManager.connect(this.peripheral);
    }
  }

  keyboardConnected() {
    this.log('connected');
    this.peripheral.discoverServices();
  }

  servicesDiscovered(services) {
    this.log('services', services);
    this.services = services;
    this.log('mainService', this.mainService);
    this.mainService.on('characteristicsDiscover', this.characteristicsDiscovered.bind(this));
    this.peripheral.discoverCharacteristicsForService(null, this.mainService);
  }

  characteristicsDiscovered(characteristics) {
    this.log('characteristics', characteristics);
    this.characteristics = characteristics;
    this.resolve(this);
  }

  log(...s) {
    if (!this.debug) { return; }
    console.log(...s);
  }
}

AnneProKeyboard.LightingModes = {
  Custom: 128,
  Off: 0,
  Red: 1,
  Yellow: 2,
  Green: 3,
  Cyan: 4,
  Blue: 5,
  Purple: 6,
  Pink: 7,
  Orange: 8,
  White: 9,
  Breathing: 13,
  Rainbow: 14,
  SingleLight: 15,
  SingleLightLong: 16,
  Poptang: 17,
  Colorful: 18,
};

module.exports = AnneProKeyboard;
module.exports.LightingModes = AnneProKeyboard.LightingModes;