import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpCustomDocument } from './common/document';
import { CustomExceptionFilter } from './common/exception.filter';
import { createCustomLogger } from './common/logger';
import { createCustomValidationPipe } from './common/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(createCustomValidationPipe());
  app.setGlobalPrefix('api/v1');
  setUpCustomDocument(app);
  await app.listen(3000);
}
bootstrap();
