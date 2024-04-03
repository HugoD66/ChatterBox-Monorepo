'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.jwtConstants = void 0;
const crypto_1 = require('crypto');
exports.jwtConstants = {
  secret: (0, crypto_1.randomBytes)(32).toString(`hex`),
};
//# sourceMappingURL=constant.js.map
