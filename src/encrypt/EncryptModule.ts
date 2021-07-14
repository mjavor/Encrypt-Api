import { Module } from '@nestjs/common';
import { EncryptContentController } from './controller/EncryptContentController';

@Module({
  controllers: [EncryptContentController],
})
export class EncryptModule {}
