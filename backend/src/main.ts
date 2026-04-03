import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix for all routes
  app.setGlobalPrefix('api');

  // Enable CORS only for React frontend on port 3001
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  });

  // Start server on port 3002
  const port = Number(process.env.PORT ?? 3002);
  await app.listen(port);
  console.log(`✅ Backend running on http://localhost:${port}/api`);
}

void bootstrap();