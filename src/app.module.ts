import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkingsService } from './workings/workings.service';
import { WorkingsController } from './workings/workings.controller';

@Module({
  imports: [],
  controllers: [AppController, WorkingsController],
  providers: [AppService, WorkingsService],
})
export class AppModule {}
