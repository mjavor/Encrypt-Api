import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../user/entity/User';
import { UserProviderInterface } from '../../user/service/UserProviderInterface';
import { UserProvider } from '../../user/service/UserProvider';
import { hasNotValue } from '../../common/function/Nullable';
import { ArgonHashManager } from '../services/ArgonHashManager';
import { PasswordHashManager } from '../services/PasswordHashManager';
import { LOGIN_FIREWALL } from '../../common/const/Firewall';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, LOGIN_FIREWALL) {
  constructor(
    @Inject(UserProvider) private readonly userProvider: UserProviderInterface,
    @Inject(ArgonHashManager)
    private readonly passwordVerifier: PasswordHashManager,
  ) {
    super({
      passwordField: 'password',
      usernameField: 'email',
    });
  }

  async validate(username: string, password: string): Promise<User> {
    const user = await this.userProvider.findByEmail(username);
    if (hasNotValue(user)) {
      throw new UnauthorizedException();
    }

    const isPasswordCorrect = await this.passwordVerifier.verify(
      password,
      user.passwordHash,
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
