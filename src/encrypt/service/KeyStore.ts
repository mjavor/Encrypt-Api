import { Injectable } from '@nestjs/common';
import { KeyObject } from 'crypto';
import { ExportedKeyPair } from '../type/ExportedKeyPair';
import { generateRsaKeyPair } from '../../common/function/GenerateKeyPair';
import { Nullable } from '../../common/type/Nullable';

@Injectable()
export class KeyStore {
  private inMemoryKeyStore: Record<string, KeyObject> = {};

  async generateKeyPairForId(id: string): Promise<ExportedKeyPair> {
    const { publicKey, privateKey } = await generateRsaKeyPair();

    this.inMemoryKeyStore[id] = publicKey;

    return {
      pubKey: publicKey.export({ format: 'pem', type: 'pkcs1' }).toString(),
      privKey: privateKey.export({ format: 'pem', type: 'pkcs1' }).toString(),
    };
  }

  getPublicKeyForId(id: string): Nullable<KeyObject> {
    return this.inMemoryKeyStore[id];
  }
}
