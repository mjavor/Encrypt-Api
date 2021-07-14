export type EncryptedContentResponse =
  | EncryptedContentSuccessResponse
  | EncryptedContentFailureResponse;

type EncryptedContentSuccessResponse = {
  encryptedContent: string;
};

type EncryptedContentFailureResponse = {
  error: string;
};
