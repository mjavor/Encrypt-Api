import { PasswordHashManager } from './PasswordHashManager';
import { hash, compare } from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BcryptHashManager implements PasswordHashManager {
  async verify(phrase: string, hash: string): Promise<boolean> {
    return compare(phrase, hash);
  }

  hash(phrase: string): Promise<string> {
    return hash(phrase, 12);
  }
}
