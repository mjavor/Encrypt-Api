import { PasswordVerifier } from './PasswordVerifier';
import * as argon from 'argon2';

export class ArgonHashVerifier implements PasswordVerifier {
  async verify(phrase: string, hash: string): Promise<boolean> {
    return argon.verify(hash, phrase);
  }
}
