import { User } from '../../user/entity/User';
import { KeyStore } from './KeyStore';
import { ContentProvider } from './ContentProvider';
import { ContentEncrypter } from './ContentEncrypter';
import { Inject } from '@nestjs/common';
import { SamplePdfProvider } from './SamplePdfProvider';
import { RsaEncrypter } from './RsaEncrypter';
import { hasNotValue } from '../../common/function/Nullable';
import { LackOfKeyError } from '../error/LackOfKeyError';

export class EncryptedContentProvider {
  constructor(
    private readonly keystore: KeyStore,
    @Inject(SamplePdfProvider)
    private readonly contentProvider: ContentProvider,
    @Inject(RsaEncrypter) private readonly contentEncrypter: ContentEncrypter,
  ) {}

  async getEncryptedContent(user: User): Promise<string> {
    const publicKey = this.keystore.getPublicKeyForId(user.id);

    if (hasNotValue(publicKey)) {
      throw new LackOfKeyError();
    }

    const content = this.contentProvider.getContent();
    return this.contentEncrypter.encrypt(content, publicKey);
  }
}
