import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { loadFile, loadFixtures } from './common/function/LoadFixtures';
import { ConfigService } from '@nestjs/config';
import { PORT } from './common/const/Config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await loadFixtures(app);
  await loadFile(app);

  await app.listen(app.get<ConfigService>(ConfigService).get<number>(PORT));
}
bootstrap();
