import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersResolver } from './users/users.resolver';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

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
          entities: [],
          synchronize: true,
        };
        console.log(dbConfig);
        return dbConfig;
      },
      inject: [ConfigService],
    }),

    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, UsersResolver],
})
export class AppModule {}
