import { Module } from '@nestjs/common';
import { EncryptContentController } from './controller/EncryptContentController';
import { KeyStore } from './service/KeyStore';
import { KeyController } from './controller/KeyController';
import { AuthModule } from '../auth/AuthModule';
import { SamplePdfProvider } from './service/SamplePdfProvider';

@Module({
  imports: [AuthModule],
  providers: [KeyStore, SamplePdfProvider],
  controllers: [EncryptContentController, KeyController],
})
export class EncryptModule {}
