import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { createUserDto } from './dto/createUser.dto';
import { UserService } from './user.service';

@Controller("users")
export class UserController {
    constructor(
        @Inject(UserService) private userService: UserService
    ){}
    @Get()
    async index(@Req() req , @Res() res) {
        return await res.json(await this.userService.findAll())
    }
    @Post()
    async create(@Body() createDto: createUserDto  , @Res() res) {
        return await res.status(201).json(await this.userService.register(createDto))
    }

}
