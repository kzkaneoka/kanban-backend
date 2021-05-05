import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ColumnsController } from './columns/columns.controller';

@Module({
  imports: [],
  controllers: [AppController, ColumnsController],
  providers: [AppService],
})
export class AppModule {}
