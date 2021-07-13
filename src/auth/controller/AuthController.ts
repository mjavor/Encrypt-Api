import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOGIN_FIREWALL } from '../../common/const/firewall';

@Controller('api')
export class AuthController {

  @Post('sign-in')
  @UseGuards(AuthGuard(LOGIN_FIREWALL))
  signIn() {
    return {}
  }

}