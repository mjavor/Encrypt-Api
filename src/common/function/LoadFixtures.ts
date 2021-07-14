import { INestApplication } from '@nestjs/common';
import { UserProvider } from '../../user/service/UserProvider';
import { MockProvider } from '../../user/service/MockProvider';

export const loadFixtures = async (app: INestApplication) => {
  const userProvider = app.get<UserProvider>(UserProvider);
  const mockProvider = app.get<MockProvider>(MockProvider);

  userProvider.loadUsers(await mockProvider.provideUserMocks());
};