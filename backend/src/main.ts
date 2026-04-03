import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix for all routes
  app.setGlobalPrefix('api');

  // Enable CORS for React frontend
  app.enableCors({ origin: true, credentials: true });

  // Start server
  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port);
  console.log(`✅ Backend running on http://localhost:${port}/api`);
}

void bootstrap();