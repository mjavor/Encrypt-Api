import { Brand } from '../../common/type/Brand';

export type UserId = Brand<'UserId', string>;

export class User {
  constructor(
    public readonly id: UserId,
    public readonly emailAddress: string,
    public readonly passwordHash: string,
  ) {}
}
