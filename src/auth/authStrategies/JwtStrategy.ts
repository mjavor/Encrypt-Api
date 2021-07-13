import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject } from '@nestjs/common';
import { JWT_SECRET } from '../../common/const/Config';
import { Nullable } from '../../common/type/Nullable';
import { User } from '../../user/entity/User';
import { JwtPayload } from '../dto/JwtPayload';
import { UserProviderInterface } from '../../user/service/UserProviderInterface';
import { UserProvider } from '../../user/service/UserProvider';
import { JWT_FIREWALL } from '../../common/const/Firewall';

export class JwtStrategy extends PassportStrategy(Strategy, JWT_FIREWALL) {
  constructor(
    @Inject(UserProvider) private readonly userProvider: UserProviderInterface,
    @Inject(JWT_SECRET) jwtSecret: string,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate({ email }: JwtPayload): Promise<Nullable<User>> {
    return this.userProvider.findByEmail(email);
  }
}
