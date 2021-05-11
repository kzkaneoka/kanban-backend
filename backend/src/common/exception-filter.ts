import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const httpRequest = `${request.method} ${
      request.originalUrl
    } ${JSON.stringify(request.body)}`;
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }
    this.logger.error(`${httpRequest} - ${message}`);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      httpRequest,
      message,
    });
  }
}
