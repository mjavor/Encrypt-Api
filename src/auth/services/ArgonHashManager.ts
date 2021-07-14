import { PasswordHashManager } from './PasswordHashManager';
import * as argon from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArgonHashManager implements PasswordHashManager {
  async verify(phrase: string, hash: string): Promise<boolean> {
    return argon.verify(hash, phrase);
  }

  hash(phrase: string): Promise<string> {
    return argon.hash(phrase);
  }
}
