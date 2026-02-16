import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const existingUser = await this.findByEmail(createUserDto.email);
        
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

        const createdUser = new this.userModel({
            ...createUserDto,
            password: hashedPassword,
        });
        return createdUser.save();
    }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().select('-password').exec();
    }

    async findById(id: string): Promise<UserDocument> {
        const user = await this.userModel
            .findById(id)
            .select('-password')
            .exec();
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async validatePassword(plainPassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(plainPassword, hashedPassword);
    }

    async update(id: string, updateUserDto: any): Promise<UserDocument> {
        const user = await this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .select('-password')
            .exec();
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async remove(id: string): Promise<UserDocument> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}