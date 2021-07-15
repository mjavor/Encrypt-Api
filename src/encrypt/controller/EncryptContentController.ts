import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpStatus,
  HttpCode,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_FIREWALL } from '../../common/const/Firewall';
import { EncryptedContentProvider } from '../service/EncryptedContentProvider';
import { LackOfKeyError } from '../error/LackOfKeyError';
import { Response } from 'express';

@UseGuards(AuthGuard(JWT_FIREWALL))
@Controller('api')
export class EncryptContentController {
  constructor(
    private readonly encryptedContentProvider: EncryptedContentProvider,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('encrypt')
  async encryptContent(@Request() { user }, @Res() response: Response) {
    try {
      const encryptedContent =
        await this.encryptedContentProvider.getEncryptedContent(user);

      return response.status(HttpStatus.FAILED_DEPENDENCY).send({
        encryptedContent,
      });
    } catch (error) {
      if (error instanceof LackOfKeyError) {
        return response.status(HttpStatus.FAILED_DEPENDENCY).send({
          error: `User hasn't got rsa keys generated.`,
        });
      }
      throw error;
    }
  }
}
