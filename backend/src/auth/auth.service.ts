import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { LoginResponseDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.usersService.findByEmail(email);
        if (user && await this.usersService.validatePassword(password, user.password)) {
            const { password, ...result } = user.toObject();
            return result as User;
        }
        return null;
    }

    async login(user: any) {
        const payload = {
            email: user.email,
            sub: user._id,
        };
        return new LoginResponseDto({
            success: true,
            message: 'Login successful',
            code: 200,
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
            },

        })
    }

    async register(registerDto: RegisterDto) {
        const user = await this.usersService.create(registerDto);
        return this.login(user);
    }
}