import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { AllExceptionsFilter } from './common/all-exception.filter';
import { createCustomLogger } from './common/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: createCustomLogger(),
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
