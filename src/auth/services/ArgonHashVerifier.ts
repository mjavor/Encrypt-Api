import { PasswordVerifier } from './PasswordVerifier';

export class ArgonHashVerifier implements PasswordVerifier {
  async verify(phrase: string, hash: string): Promise<boolean> {
    return Promise.resolve(false);
  }
}
