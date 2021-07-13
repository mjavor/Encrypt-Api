import { Module } from '@nestjs/common';
import { UserProvider } from './service/UserProvider';

@Module({
  providers: [UserProvider],
  exports: [UserProvider],
})
export class UserModule {}
