import { Global, Module, Logger } from '@nestjs/common';
import { UserModule } from './modules/system/user/user.module';
import { LogModule } from './modules/system/log/log.module';
import { RoleModule } from './modules/system/role/role.module';
import { MenuModule } from './modules/system/menu/menu.module';
import { EpubookModule } from './modules/book/epubook/epubook.module';
import * as Joi from 'joi';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseConfigEnum } from './enum/config.enum';
const envFilePath = [`.env.${process.env.NODE_ENV || 'development'}`, `.env`];

@Global()
@Module({
  imports: [
    // 配置全局配置
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision')
          .default('development'),
        APP_NAME: Joi.string().default('NestJS'),
        APP_PORT: Joi.number().default(3000),
        APP_PATH: Joi.string().required(),
        DB_HOST: Joi.alternatives().try(
          Joi.string().ip(),
          Joi.string().domain(),
        ),
        DB_PORT: Joi.number().default(3306),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
    // 配置数据库
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          type: configService.get(DatabaseConfigEnum.DB_TYPE),
          host: configService.get(DatabaseConfigEnum.DB_HOST),
          port: configService.get(DatabaseConfigEnum.DB_PORT),
          username: configService.get(DatabaseConfigEnum.DB_USERNAME),
          password: configService.get(DatabaseConfigEnum.DB_PASSWORD),
          database: configService.get(DatabaseConfigEnum.DB_DATABASE),
          synchronize: configService.get(DatabaseConfigEnum.DB_SYNCHRONIZE),
          entities: ['dist/modules/**/**/entities/*.entity{.ts,.js}'],
        } as TypeOrmModuleOptions;
      },
    }),
    UserModule,
    LogModule,
    RoleModule,
    MenuModule,
    EpubookModule,
  ],
  controllers: [],
  providers: [Logger],
  exports: [Logger],
})
export class AppModule {}
