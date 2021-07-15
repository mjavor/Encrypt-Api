import { EncryptedContentProvider } from './EncryptedContentProvider';
import { instance, mock, when } from 'ts-mockito';
import { KeyStore } from './KeyStore';
import { SamplePdfProvider } from './SamplePdfProvider';
import { RsaEncrypter } from './RsaEncrypter';
import { User, UserId } from '../../user/entity/User';
import { LackOfKeyError } from '../error/LackOfKeyError';

describe('Test EncryptedContentProvider', () => {
  test('Test throwing error for lack of key', () => {
    // Arrange
    const userIdWithoutKeys = '1234' as UserId;

    const keystoreMock = mock<KeyStore>(KeyStore);
    when(keystoreMock.getPublicKeyForId(userIdWithoutKeys)).thenReturn(null);

    const contentProviderMock = mock<SamplePdfProvider>(SamplePdfProvider);
    const rsaEncrypterMock = mock<RsaEncrypter>(RsaEncrypter);

    const provider = new EncryptedContentProvider(instance(keystoreMock), contentProviderMock, rsaEncrypterMock);

    // Act
    const f = async () => { await provider.getEncryptedContent(new User(userIdWithoutKeys, 'anything', 'anything')) };

    //Assert
    expect(f()).rejects.toThrow(LackOfKeyError);
  });

  test('Test content returning', async () => {
    // Arrange
    const userIdWithKeys = '1234' as UserId;
    const publicKey = 'publicKey';
    const encrypted = 'encryptedContent';

    const keystoreMock = mock<KeyStore>(KeyStore);
    when(keystoreMock.getPublicKeyForId(userIdWithKeys)).thenReturn(publicKey);

    const contentProviderMock = mock<SamplePdfProvider>(SamplePdfProvider);
    const rsaEncrypterMock = mock<RsaEncrypter>(RsaEncrypter);
    when(rsaEncrypterMock.encrypt(null, publicKey)).thenReturn(encrypted);

    const provider = new EncryptedContentProvider(instance(keystoreMock), instance(contentProviderMock), instance(rsaEncrypterMock));

    // Act
    const result = await provider.getEncryptedContent(new User(userIdWithKeys, 'anything', 'anything'));

    //Assert
    expect(result).toBe(encrypted);
  });

})