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
const user_general_roles_enum_1 = require("../users/entities/types/user.general.roles.enum");
let UserFixtures = class UserFixtures {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async seedUsers() {
        const users = [
            {
                pseudo: `Aadministrateur`,
                email: `admin@email.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Admin,
                picture: `./uploads/user/admin.png`,
            },
            {
                pseudo: `Hugo Dessauw`,
                email: `dessauw.hugo@gmail.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/admin.png`,
            },
            {
                pseudo: `John Doe`,
                email: `john1@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userHFixture1.png`,
            },
            {
                pseudo: `Jane Doe`,
                email: `jane1@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userFFixture1.png`,
            },
            {
                pseudo: `Alice Johnson`,
                email: `alice@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userFFixture2.png`,
            },
            {
                pseudo: `Bob Smith`,
                email: `bob@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userHFixture2.png`,
            },
            {
                pseudo: `Carol White`,
                email: `carol@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userFFixture3.png`,
            },
            {
                pseudo: `Dave Brown`,
                email: `dave@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userHFixture3.png`,
            },
            {
                pseudo: `Eve Black`,
                email: `eve@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userFFixture4.png`,
            },
            {
                pseudo: `Frank Green`,
                email: `frank@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
                picture: `./uploads/user/userHFixture4.png`,
            },
            {
                pseudo: `Grace Blue`,
                email: `grace@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Admin,
                picture: `./uploads/user/userFFixture5.png`,
            },
            {
                pseudo: `Henry Yellow`,
                email: `henry@example.com`,
                password: `Azeaze.66`,
                roleGeneral: user_general_roles_enum_1.UserGeneralRoleEnum.Admin,
                picture: `./uploads/user/userHFixture5.png`,
            },
        ];
        for (const user of users) {
            await this.usersService.create(user);
        }
        const createdUsers = await this.usersService.findAllUsers();
        for (const createdUser of createdUsers) {
            for (let i = 0; i < 10; i++) {
                const randomUser = createdUsers[Math.floor(Math.random() * createdUsers.length)];
                if (randomUser.id !== createdUser.id) {
                    await this.usersService.addFriend(createdUser.id, randomUser);
                }
            }
        }
    }
};
exports.UserFixtures = UserFixtures;
exports.UserFixtures = UserFixtures = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserFixtures);
//# sourceMappingURL=user.fixtures.js.map