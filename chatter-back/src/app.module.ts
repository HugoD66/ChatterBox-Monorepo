import { Module } from '@nestjs/common';
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
import { APP_GUARD } from '@nestjs/core';
import { MessageModule } from './message/message.module';
import { Message } from './message/entities/message.entity';
import { FixtureModule } from './fixtures/fixture/fixture.module';

@Module({
  imports: [
    UsersModule,
    MessageModule,
    FixtureModule,
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
          entities: [User, Message],
          synchronize: true,
        };
        console.log(dbConfig);
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
