import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EventsModule } from './events/events.module';
import { PugAdapter, MailerModule } from '@nest-modules/mailer';

@Module({
  imports: [
    MongooseModule.forRootAsync(
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          uri: configService.get('MONGODB_URI'),
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }),
      }),
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        transport: 'smtps://dev@globalbit.co.il:globalbit123@smtp.gmail.com',
        defaults: {
          from: '"Globalbit" <dev@globalbit.io>',
        },
        template: {
          dir: 'src/templates',
          adapter: new PugAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
    AuthModule,
    UsersModule,
    EventsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
