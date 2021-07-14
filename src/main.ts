import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { loadFile, loadFixtures } from './common/function/LoadFixtures';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await loadFixtures(app);
  await loadFile(app);

  await app.listen(3000);
}
bootstrap();
