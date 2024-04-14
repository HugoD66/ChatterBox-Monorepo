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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_general_roles_enum_1 = require("./entities/types/user.general.roles.enum");
const ValidationErrors_1 = require("../exceptions/ValidationErrors");
let UsersService = class UsersService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async create(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: { email: createUserDto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email déjà pris.');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            pseudo: createUserDto.pseudo,
            email: createUserDto.email,
            password: hashedPassword,
            roleGeneral: createUserDto.roleGeneral ?? user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
        });
        const savedUser = await this.usersRepository.save(user);
        return savedUser;
    }
    async register(createUserDto) {
        const existingUser = await this.usersRepository.findOne({
            where: [{ email: createUserDto.email }, { pseudo: createUserDto.pseudo }],
        });
        if (existingUser) {
            throw new common_1.BadRequestException("Email ou Nom d'utilisateur déjà pris.");
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            pseudo: createUserDto.pseudo,
            email: createUserDto.email,
            password: hashedPassword,
            roleGeneral: createUserDto.roleGeneral ?? user_general_roles_enum_1.UserGeneralRoleEnum.Utilisateur,
        });
        const savedUser = await this.usersRepository.save(user);
        return savedUser;
    }
    async login(loginDto) {
        const user = await this.usersRepository.findOne({
            where: { email: loginDto.email },
        });
        if (!user) {
            throw new common_1.NotFoundException(ValidationErrors_1.ValidationErrors.USER_NOT_FOUND);
        }
        const passwordMatch = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordMatch) {
            throw new common_1.UnauthorizedException(ValidationErrors_1.ValidationErrors.CREDENTIALS_INVALID);
        }
        const payload = { sub: user.id, email: user.email };
        return {
            ...user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async findOne(id) {
        return this.usersRepository.findOne({ where: { id } });
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async update(id, updateUserDto) {
        const user = await this.usersRepository.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = {
            ...user,
            ...updateUserDto,
        };
        await this.usersRepository.save(updatedUser);
        return {
            id: updatedUser.id,
            pseudo: updatedUser.pseudo,
            email: updatedUser.email,
            picture: updatedUser.picture,
            createdAt: updatedUser.createdAt,
            roleGeneral: updatedUser.roleGeneral,
        };
    }
    async remove(id) {
        await this.usersRepository.delete(id);
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], UsersService);
//# sourceMappingURL=users.service.js.map