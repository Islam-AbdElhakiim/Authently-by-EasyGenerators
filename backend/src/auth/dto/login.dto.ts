import { IsEmail, IsString, MinLength } from "class-validator";
import { User, UserDocument } from "src/users/schemas/user.schema";

export class LoginDto {
    @IsEmail()
    email: string;
    @IsString()
    // @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @MinLength(6)
    password: string;
}

export interface ILoginResponseDto {
    success: boolean
    message: string
    code: number
    authentlyError?: boolean
    access_token?: string
    user?: Partial<UserDocument>
}

export class LoginResponseDto implements ILoginResponseDto {
    success: boolean;
    message: string;
    code: number;
    access_token?: string;
    user?: Partial<UserDocument>;
    authentlyError?: boolean;
    // ctor
    constructor({ success, message, code, access_token, user, authentlyError }: ILoginResponseDto) {
        this.success = success;
        this.message = message;
        this.code = code;
        this.access_token = access_token;
        this.user = user;
        this.authentlyError = authentlyError;
    }

}