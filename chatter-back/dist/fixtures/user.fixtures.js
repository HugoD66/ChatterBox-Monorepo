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
exports.UserFixtures = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const user_roles_enum_1 = require("../users/entities/types/user.roles.enum");
let UserFixtures = class UserFixtures {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async seedUsers() {
        const user = {
            pseudo: `Administrateur`,
            email: `test@test.com`,
            password: `Azeaze.66`,
            role: user_roles_enum_1.UserRoleEnum.Admin,
        };
        console.log('user ! ');
        await this.usersService.register(user);
    }
};
exports.UserFixtures = UserFixtures;
exports.UserFixtures = UserFixtures = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserFixtures);
//# sourceMappingURL=user.fixtures.js.map