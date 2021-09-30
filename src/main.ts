import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice({
    // transport: Transport.RMQ,
    // options: {
    //   urls: ['amqp://localhost:5672'],
    //   queue: 'chat_try_queue',
    //   queueOptions: {
    //     durable: false,
        
    //   },
    // },
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 4000
    }
  })

  await app.startAllMicroservices();
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
