import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
export const BoostrapDocs = (app: INestApplication) => {
  const docs = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('My ApI Docs')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, docs);
  SwaggerModule.setup('/docs/v1', app, documentFactory);
};
