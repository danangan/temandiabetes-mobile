const Device = require('./device');

function applyScale(size) {
  return Math.round(size * Device.scale);
}

module.exports = applyScale;
