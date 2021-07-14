import { User } from '../entity/User';
import { Inject, Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { ArgonHashManager } from '../../auth/services/ArgonHashManager';
import { PasswordHashManager } from '../../auth/services/PasswordHashManager';

@Injectable()
export class MockProvider {
  constructor(
    @Inject(ArgonHashManager)
    private readonly passwordHashManager: PasswordHashManager,
  ) {}

  async provideUserMocks(): Promise<User[]> {
    const userFixturesFilePath = resolve(__dirname, '../fixtures/users.json');
    const mocksFileContent = await readFile(userFixturesFilePath, {
      encoding: 'utf8',
    });
    const userMocks = JSON.parse(mocksFileContent);

    return Promise.all(
      userMocks.map(
        async ({ id, emailAddress, plainPassword }) =>
          new User(
            id,
            emailAddress,
            await this.passwordHashManager.hash(plainPassword),
          ),
      ),
    );
  }
}
