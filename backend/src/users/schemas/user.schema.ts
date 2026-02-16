import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";


@Schema({ timestamps: true })
export class User {
    @Prop({
        required: [true, 'Email is required'],
        unique: [true, 'Email must be unique'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    })
    email: string;

    @Prop({
        required: [true, 'Password is required'],
        minLength: [6, 'Password must be at least 6 characters long']
    })
    password: string;

    @Prop({
        required: [true, 'Username is required'],
        match: [/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric']
    })
    username: string;

    @Prop({
        required: [true, 'Phone number is required'],
        unique: [true, 'Phone number must be unique'],
        match: [/^\d{10}$/, 'Phone number must be 10 digits']
    })
    phone: string;

    @Prop({ default: true })
    isActive: boolean;
}
export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);