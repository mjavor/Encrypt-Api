import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_FIREWALL } from '../../common/const/Firewall';
import { KeyStore } from '../service/KeyStore';
import { User } from '../../user/entity/User';

@Controller('api')
@UseGuards(AuthGuard(JWT_FIREWALL))
export class KeyController {
  constructor(private readonly keystore: KeyStore) {}

  @Post('generate-key-pair')
  async generateKeyPair(@Request() { user }) {
    return this.keystore.generateKeyPairForId((user as User).id);
  }
}
