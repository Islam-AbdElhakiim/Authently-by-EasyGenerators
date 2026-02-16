import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) { }

    @Post()
    create(@Body() createUserDto: CreateUserDto) {
        this.logger.debug(`Creating user with data: ${JSON.stringify(createUserDto)}`);
        return this.usersService.create(createUserDto)
    }

    @Get()
    findAll() {
        this.logger.debug("Finding all users");
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        this.logger.debug(`Finding user with id: ${id}`);
        return this.usersService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        this.logger.debug(`Updating user with id: ${id} and data: ${JSON.stringify(updateUserDto)}`);
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        this.logger.debug(`Removing user with id: ${id}`);
        return this.usersService.remove(id);
    }
}