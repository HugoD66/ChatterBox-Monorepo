"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const ValidationErrors_1 = require("../../exceptions/ValidationErrors");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ValidationErrors_1.ValidationErrors.REQUIRED_FIELD }),
    (0, class_validator_1.MinLength)(3, { message: ValidationErrors_1.ValidationErrors.PSEUDO_LENGTH }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "pseudo", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: ValidationErrors_1.ValidationErrors.REQUIRED_FIELD }),
    (0, class_validator_1.IsEmail)({}, { message: ValidationErrors_1.ValidationErrors.EMAIL_INVALID }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: `Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial`,
    }),
    (0, class_validator_1.IsNotEmpty)({ message: ValidationErrors_1.ValidationErrors.REQUIRED_FIELD }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
//# sourceMappingURL=create-user.dto.js.map