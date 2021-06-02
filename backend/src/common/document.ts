import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export function setUpCustomDocument(app) {
  const config = new DocumentBuilder()
    .setTitle('Kanban')
    .setDescription('This is the Kanban API version 1 documentation.')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth')
    .addTag('users')
    .addTag('columns')
    .addTag('cards')
    .build();
  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'Kanban API Docs',
  };
  SwaggerModule.setup('api/v1/docs', app, document, customOptions);
}
