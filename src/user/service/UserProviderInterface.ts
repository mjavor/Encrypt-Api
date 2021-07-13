import { Nullable } from '../../common/type/Nullable';
import { User } from '../entity/User';

export interface UserProviderInterface {
  findByEmail(email: string): Promise<Nullable<User>>;
}
