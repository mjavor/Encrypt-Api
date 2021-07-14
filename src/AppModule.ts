import { Module } from '@nestjs/common';
import { AuthModule } from './auth/AuthModule';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/UserModule';
import { EncryptModule } from './encrypt/EncryptModule';
import { EncryptedContentProvider } from './encrypt/service/EncryptedContentProvider';
import { KeyStore } from './encrypt/service/KeyStore';
import { SamplePdfProvider } from './encrypt/service/SamplePdfProvider';
import { RsaEncrypter } from './encrypt/service/RsaEncrypter';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, EncryptModule],
  controllers: [],
  providers: [
    EncryptedContentProvider,
    KeyStore,
    SamplePdfProvider,
    RsaEncrypter,
  ],
})
export class AppModule {}
