import { INestApplication } from '@nestjs/common';
import { UserProvider } from '../../user/service/UserProvider';
import { MockProvider } from '../../user/service/MockProvider';
import { SamplePdfProvider } from '../../encrypt/service/SamplePdfProvider';

export const loadFixtures = async (app: INestApplication) => {
  const userProvider = app.get<UserProvider>(UserProvider);
  const mockProvider = app.get<MockProvider>(MockProvider);

  userProvider.loadUsers(await mockProvider.provideUserMocks());
};

export const loadFile = async (app: INestApplication) => {
  await app.get<SamplePdfProvider>(SamplePdfProvider).downloadFile();
};
