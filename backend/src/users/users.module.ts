import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";


@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: require('./schemas/user.schema').UserSchema }])],
    controllers: [require('./users.controller').UsersController],
    providers: [require('./users.service').UsersService],
})
export class UsersModule { }