import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        MongooseModule.forFeature([{ name: 'User', schema: require('../users/schemas/user.schema').UserSchema }]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '24h' },

            }),
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, UsersService],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
    constructor() {
        console.log('🔧 JWT Module initialized with secret:', process.env.JWT_SECRET || 'default_secret');
    }
}