import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const corsOptions: CorsOptions = {
    origin: `http://localhost:4200`,
    methods: `GET,HEAD,PUT,PATCH,POST,DELETE`,
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);

  //const userFixtures: UserFixtures = app.get(UserFixtures);
  //await userFixtures.seedUsers();

  await app.listen(3000);
}
bootstrap();
