import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/UserModule';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
