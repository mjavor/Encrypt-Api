import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_FIREWALL } from '../../common/const/Firewall';
import { EncryptedContentResponse } from '../type/EncryptedContentResponse';
import { EncryptedContentProvider } from '../service/EncryptedContentProvider';
import { LackOfKeyError } from '../error/LackOfKeyError';

@UseGuards(AuthGuard(JWT_FIREWALL))
@Controller('api')
export class EncryptContentController {
  constructor(
    private readonly encryptedContentProvider: EncryptedContentProvider,
  ) {}

  @Post('encrypt')
  async encryptContent(@Request() { user }): Promise<EncryptedContentResponse> {
    try {
      const encryptedContent =
        await this.encryptedContentProvider.getEncryptedContent(user);

      return {
        encryptedContent,
      };
    } catch (error) {
      if (error instanceof LackOfKeyError) {
        return {
          error: `User hasn't got rsa keys generated.`,
        };
      }
      throw error;
    }
  }
}
