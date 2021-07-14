import { Injectable } from '@nestjs/common';
import { ExportedKeyPair } from '../type/ExportedKeyPair';
import { generateRsaKeyPair } from '../../common/function/GenerateKeyPair';
import { Nullable } from '../../common/type/Nullable';

@Injectable()
export class KeyStore {
  private inMemoryKeyStore: Record<string, string> = {};

  async generateKeyPairForId(id: string): Promise<ExportedKeyPair> {
    const { publicKey, privateKey } = await generateRsaKeyPair();

    this.inMemoryKeyStore[id] = publicKey;

    return {
      pubKey: publicKey,
      privKey: privateKey,
    };
  }

  getPublicKeyForId(id: string): Nullable<string> {
    return this.inMemoryKeyStore[id];
  }
}
