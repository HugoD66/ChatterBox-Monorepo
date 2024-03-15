'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EmailAlreadyExistsException = void 0;
const common_1 = require('@nestjs/common');
class EmailAlreadyExistsException extends common_1.HttpException {
  constructor() {
    super('Email already exists', common_1.HttpStatus.BAD_REQUEST);
  }
}
exports.EmailAlreadyExistsException = EmailAlreadyExistsException;
//# sourceMappingURL=EmailAlreadyExistsException.js.map
