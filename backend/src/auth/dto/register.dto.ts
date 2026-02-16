import { IsEmail, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsString()
    @MinLength(3, { message: 'Username must be at least 3 characters long' })
    username: string;

    @IsString()
    @MinLength(10, { message: 'Phone number must be at least 10 characters long' })
    phone: string;
}