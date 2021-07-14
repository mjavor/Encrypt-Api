import { ContentEncrypter } from './ContentEncrypter';
import * as NodeRsa from 'node-rsa';

export class RsaEncrypter implements ContentEncrypter {
  encrypt(content: Buffer, publicKey: string): string {
    const key = new NodeRsa(publicKey);
    return key.encrypt(content, 'base64');
  }
}
