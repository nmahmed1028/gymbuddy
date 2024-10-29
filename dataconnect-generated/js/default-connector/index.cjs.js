const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'gymbuddy-data-connect',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

