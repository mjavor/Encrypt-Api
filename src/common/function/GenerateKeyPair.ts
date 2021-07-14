import { generateKeyPairSync, KeyPairKeyObjectResult } from 'crypto';

export const generateRsaKeyPair = async (): Promise<KeyPairKeyObjectResult> =>
  new Promise((resolve, reject) => {
    try {
      const keyPair = generateKeyPairSync('rsa', { modulusLength: 2048 });
      resolve(keyPair);
    } catch (error) {
      reject(error);
    }
  });
