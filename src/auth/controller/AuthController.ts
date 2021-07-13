import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOGIN_FIREWALL } from '../../common/const/Firewall';
import { AccessTokenResponse } from '../dto/AccessTokenResponse';
import { Request } from 'express';
import { JwtTokenManager } from '../services/JwtTokenManager';
import { User } from '../../user/entity/User';

@Controller('api')
export class AuthController {
  constructor(private readonly jwtTokenManager: JwtTokenManager) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard(LOGIN_FIREWALL))
  async signIn(@Req() { user }: Request): Promise<AccessTokenResponse> {
    return {
      authToken: await this.jwtTokenManager.generateToken(user as User),
    };
  }
}
