import { Injectable } from '@nestjs/common';
import { UserProviderInterface } from './UserProviderInterface';
import { Nullable } from '../../common/type/Nullable';
import { User } from '../entity/User';

@Injectable()
export class UserProvider implements UserProviderInterface {
  async findByEmail(email: string): Promise<Nullable<User>> {}
}
