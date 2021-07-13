import { Module } from '@nestjs/common';
import { UserModule } from '../user/UserModule';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../common/const/Config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>(JWT_SECRET),
          signOptions: { expiresIn: configService.get<string>(JWT_EXPIRES_IN) },
        };
      },
    }),
    UserModule,
  ],
  providers: [
    {
      provide: JWT_SECRET,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get<string>(JWT_SECRET),
    },
  ],
})
export class AuthModule {}
