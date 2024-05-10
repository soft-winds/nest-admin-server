import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import * as winstonDailyRotateFile from 'winston-daily-rotate-file';
import * as winston from 'winston';
import { WinstonModule, WinstonModuleOptions, utilities } from 'nest-winston';
import { LogConfigEnum } from 'src/enum/config.enum';
import { ConfigService } from '@nestjs/config';
function dailyRotateFileConfig(level: string, filename: string) {
  return new winstonDailyRotateFile({
    level,
    filename: `logs/${filename}-%DATE%.log`,
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '100m',
    maxFiles: '14d',
  });
}
@Module({
  imports: [
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const console = new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike('nest-admin', {
              colors: true,
              prettyPrint: true,
            }),
          ),
        });
        const dailyRotate = configService.get(LogConfigEnum.LOG_ON)
          ? [
              dailyRotateFileConfig(
                configService.get(LogConfigEnum.LOG_LEVEL),
                configService.get(LogConfigEnum.LOG_LEVEL),
              ),
            ]
          : [];
        return {
          transports: [console, ...dailyRotate],
        } as WinstonModuleOptions;
      },
    }),
  ],
  controllers: [LogController],
  providers: [LogService],
})
export class LogModule {}
