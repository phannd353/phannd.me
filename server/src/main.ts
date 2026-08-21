import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  middleware,
  OperationMetadataDto,
  PaginationMetadataDto,
} from './common';
import { initSwagger } from './common/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  const logger = app.get(Logger);

  middleware(app);

  // Global prefix
  app.setGlobalPrefix('/api/v1');

  const port = process.env.NODE_PORT || 3000;
  await initSwagger({
    app,
    name: 'phannd.me API Documentation',
    isStartEndpoint: true,
    extraModels: [OperationMetadataDto, PaginationMetadataDto],
  });

  logger.log(`Starting phannd.me server on port ${port}...`);
  app.enableShutdownHooks();
  await app.listen(port);
  logger.log(
    `phannd.me server is running on port ${port} in ${process.env.NODE_ENV} environment`,
  );
}
bootstrap().catch(console.error);
