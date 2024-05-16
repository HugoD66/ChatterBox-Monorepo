import { forwardRef, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { PassportModule } from '@nestjs/passport';
import { AuthGuard } from './security/auth/auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './security/auth/constant';
import { User } from './users/entities/user.entity';
import { FriendUser } from './friend-users/entities/friend-user.entity';
import { APP_GUARD } from '@nestjs/core';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { FixtureModule } from './fixtures/fixture/fixture.module';
import { FriendUsersModule } from './friend-users/friend-users.module';
import { RoomModule } from './room/room.module';
import { Room } from './room/entities/room.entity';

@Module({
  imports: [
    UsersModule,
    MessageModule,
    FixtureModule,
    forwardRef(() => FriendUsersModule),
    forwardRef(() => RoomModule),
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule.register({ defaultStrategy: `jwt` }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `1h` },
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const dbConfig = {
          type: `postgres` as const,
          host: configService.get(`DB_HOST`),
          port: +configService.get<number>(`DB_PORT`),
          username: configService.get(`DB_USERNAME`),
          password: configService.get(`DB_PASSWORD`),
          database: configService.get(`DB_NAME`),
          entities: [User, Message, FriendUser, Room],
          synchronize: true,
        };
        return dbConfig;
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AppService,
  ],
})
export class AppModule {}
