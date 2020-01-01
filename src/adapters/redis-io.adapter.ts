import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';
import * as redisIoAdapter from 'socket.io-redis';
import { ConfigService } from '../config/config.service';
import { NestExpressApplication } from '@nestjs/platform-express';

export class RedisIoAdapter extends IoAdapter {
  private readonly redisAdapter;

  constructor(
    private readonly app: NestExpressApplication,
    private readonly configService: ConfigService,
  ) {
    super(app);
    this.redisAdapter = redisIoAdapter({
      host: this.configService.get('REDIS_HOST'),
      port: this.configService.get('REDIS_PORT')
    });
  }

  createIOServer(port: number, options?: ServerOptions): any {
    const server = super.createIOServer(port, options);
    server.adapter(this.redisAdapter);
    return server;
  }
}
