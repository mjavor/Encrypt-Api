import { User } from '../../user/entity/User';
import { KeyStore } from './KeyStore';
import { ContentProvider } from './ContentProvider';
import { ContentEncrypter } from './ContentEncrypter';

export class EncryptedContentProvider {
  constructor(
    private readonly keystore: KeyStore,
    private readonly contentProvider: ContentProvider,
    private readonly contentEncrypter: ContentEncrypter,
  ) {}

  getEncryptedContent(user: User): Promise<string> {
    const publicKey = this.keystore.findPublicKeyForUser(user);

    const content = this.contentProvider.getContent();
    return this.contentEncrypter.encrypt(content, publicKey);
  }
}
