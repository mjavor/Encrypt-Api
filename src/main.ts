import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { loadFile, loadFixtures } from './common/function/LoadFixtures';
import { ConfigService } from '@nestjs/config';
import { PORT } from './common/const/Config';
import * as helmet from 'helmet';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await loadFixtures(app);
  await loadFile(app);

  app.use(morgan('tiny'));
  app.use(helmet());

  await app.listen(app.get<ConfigService>(ConfigService).get<number>(PORT));
}
bootstrap();
