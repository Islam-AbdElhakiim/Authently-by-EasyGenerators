import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    // MongooseModule.forRoot(process.env.MONGO_URI ?? ''),
    MongooseModule.forRoot(process.env.MONGO_URI ?? '', {
      family: 4,
    }),
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([{ name: 'User', schema: require('./users/schemas/user.schema').UserSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, UsersService, JwtService],
})
export class AppModule { }   