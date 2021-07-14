import { Injectable } from '@nestjs/common';
import { UserProviderInterface } from './UserProviderInterface';
import { Nullable } from '../../common/type/Nullable';
import { User } from '../entity/User';

@Injectable()
export class UserProvider implements UserProviderInterface {
  private inMemoryUsersStore: User[] = [];

  async findByEmail(email: string): Promise<Nullable<User>> {
    return this.inMemoryUsersStore.find(
      ({ emailAddress }) => email === emailAddress,
    );
  }

  public loadUsers(users: User[]): void {
    this.inMemoryUsersStore = users;
  }
}
