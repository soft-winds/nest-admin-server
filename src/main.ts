import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './filter/all-exception.filter.ts';
import { ConfigService } from '@nestjs/config';
import { AppConfigEnum } from './enum/config.enum';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
const appConfig = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 设置日志
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  // 设置全局异常过滤器
  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  // 设置全局前缀
  app.setGlobalPrefix(appConfig.get(AppConfigEnum.APP_PATH));

  // 设置全局管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // 设置跨域
  app.enableCors();
  // 启动应用
  await app.listen(appConfig.get(AppConfigEnum.APP_PORT));
}
bootstrap();
