import { forwardRef, Module } from '@nestjs/common';
import { UserProvider } from './service/UserProvider';
import { MockProvider } from './service/MockProvider';
import { AuthModule } from '../auth/AuthModule';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserProvider, MockProvider],
  exports: [UserProvider],
})
export class UserModule {}
