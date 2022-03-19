import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000

  const config = new DocumentBuilder()
      .setTitle('Bookworm Api')
      .setDescription('Documentation on Bookworm Api')
      .setVersion('1.0.0')
      .addTag('Shabdanov N.')
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  app.enableCors()

  await app.listen(PORT, () => console.log('App listens on port: ' + PORT ));

}
bootstrap();
