import * as NodeRsa from 'node-rsa';

export type KeyPair = {
  publicKey: string;
  privateKey: string;
};

export const generateRsaKeyPair = async (): Promise<KeyPair> => {
  const key = new NodeRsa({ b: 2048 });

  return {
    privateKey: key.exportKey('pkcs8-private-pem'),
    publicKey: key.exportKey('pkcs8-public-pem'),
  };
};
