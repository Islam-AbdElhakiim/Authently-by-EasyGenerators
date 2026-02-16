import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { LoginResponseDto } from '../dto/login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            // console.log("User validation failed");
            throw new UnauthorizedException(
                new LoginResponseDto({
                    success: false,
                    message: 'Invalid Credentials',
                    code: 401,
                    authentlyError: true,
                })
            )
        }
        return user;
    }
}