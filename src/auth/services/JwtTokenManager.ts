import { User } from '../../user/entity/User';
import { JwtPayload } from '../dto/JwtPayload';
import { JwtService } from '@nestjs/jwt';

export class JwtTokenManager {
  constructor(private readonly jwtService: JwtService) {}

  createPayload({ emailAddress }: User): JwtPayload {
    return {
      email: emailAddress,
    };
  }
}
