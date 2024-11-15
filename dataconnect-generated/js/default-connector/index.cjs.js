const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'Lens_Geld_completo',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

