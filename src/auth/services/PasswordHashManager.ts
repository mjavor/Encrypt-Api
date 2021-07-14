export interface PasswordHashManager {
  verify(phrase: string, hash: string): Promise<boolean>;

  hash(phrase: string): Promise<string>;
}
