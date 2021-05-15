import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { ColumnsModule } from './columns/columns.module';
import { DatabaseModule } from './db/db.module';

@Module({
  imports: [CardsModule, ColumnsModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
