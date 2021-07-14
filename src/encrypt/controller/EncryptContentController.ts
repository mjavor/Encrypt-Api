import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_FIREWALL } from '../../common/const/Firewall';
import { EncryptedContentResponse } from '../type/EncryptedContentResponse';
import { EncryptedContentProvider } from '../service/EncryptedContentProvider';

@UseGuards(AuthGuard(JWT_FIREWALL))
@Controller('api')
export class EncryptContentController {
  constructor(
    private readonly encryptedContentProvider: EncryptedContentProvider,
  ) {}

  @Post('encrypt')
  async encryptContent(@Request() { user }): Promise<EncryptedContentResponse> {
    return {
      encryptedContent: await this.encryptedContentProvider.getEncryptedContent(
        user,
      ),
    };
  }
}
