import { User } from '../../user/entity/User';
import { JwtPayload } from '../dto/JwtPayload';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtTokenManager {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): Promise<string> {
    return this.jwtService.signAsync(this.createPayload(user));
  }

  createPayload({ emailAddress }: User): JwtPayload {
    return {
      email: emailAddress,
    };
  }
}
