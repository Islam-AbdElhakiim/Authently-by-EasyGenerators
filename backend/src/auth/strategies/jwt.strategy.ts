import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private configService: ConfigService) {
        // console.log("secret", configService.get<string>('JWT_SECRET'));
        super({
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: (req: Request) => {
                let token = null;
                if (req && req.cookies) {
                    token = req.cookies['access_token'];
                }
                return token;
            },
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')!,
        });
    }   

    async validate(payload: any) {
        return { userId: payload.sub, email: payload.email };
    }
}