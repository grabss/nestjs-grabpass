import { Module } from '@nestjs/common';
import { NestjsGrabpassService } from './nestjs-grabpass.service';

@Module({
  providers: [NestjsGrabpassService],
  exports: [NestjsGrabpassService],
})
export class NestjsGrabpassModule {}
