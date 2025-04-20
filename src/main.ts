import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { env } from 'process';
import { BoostrapDocs } from './doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  BoostrapDocs(app);
  const port = env.PORT || 3000;
  await app.listen(port, () => {
    const logger = new Logger('Bootsrap');
    logger.log(`✔✔ Application up and running on port ${port} 🚀🚀🚀`);
    logger.log(`✅✅ API Docs is running at http://localhost:${port}/docs/v1`);
  });
}
bootstrap();
