import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { EventsModule } from './events/events.module';
import { PugAdapter, MailerModule } from '@nest-modules/mailer';
import { config } from 'rxjs';

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
        transport: configService.get('EMAIL_PROVIDER'),
        defaults: {
          from: configService.get('EMAIL_FROM'),
        },
        template: {
          dir: 'src/emails',
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
