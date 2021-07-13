export interface PasswordVerifier {
  verify(phrase: string, hash: string): Promise<boolean>;
}
