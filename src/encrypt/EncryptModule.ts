import { Module } from '@nestjs/common';
import { EncryptContentController } from './controller/EncryptContentController';
import { KeyStore } from './service/KeyStore';
import { KeyController } from './controller/KeyController';
import { AuthModule } from '../auth/AuthModule';
import { SamplePdfProvider } from './service/SamplePdfProvider';
import { EncryptedContentProvider } from './service/EncryptedContentProvider';
import { RsaEncrypter } from './service/RsaEncrypter';

@Module({
  imports: [AuthModule],
  providers: [
    KeyStore,
    SamplePdfProvider,
    EncryptedContentProvider,
    RsaEncrypter,
  ],
  controllers: [EncryptContentController, KeyController],
})
export class EncryptModule {}
