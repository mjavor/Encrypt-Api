export interface ContentEncrypter {
  encrypt(content: Buffer, publicKey: string): string;
}
