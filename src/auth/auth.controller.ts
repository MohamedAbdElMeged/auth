import { Body, Controller, Get, Injectable, Logger, Post, Req, Res, Scope, UseGuards } from '@nestjs/common';
import { EventPattern, MessagePattern, Transport } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { loginUserDto } from './loginUser.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService
    ){}

    @Post("/login")
    async login(@Body() loginDto: loginUserDto , @Res() res){
        return await res.json(await this.authService.login(loginDto))
    }

    
    @MessagePattern({ role: 'auth', cmd: 'check'})
    @Get('/me')
    async loggedIn(data){
        console.log(data.jwt)
        try {
            const res = this.authService.validateToken(data.jwt);
      
            return res;
            console.log(data)
          } catch(e) {
            
            Logger.log(e);
            return false;
          }
    }
    @Get("/profile")
    @UseGuards(JwtAuthGuard)
    async getProfile(@Req() req){
        return await req.user
    }
    

    @MessagePattern({role: "auth", cmd: "kk"})
    @Get('/kk')
    getLL(data)
    {
        console.log(data)
        return data
    }

}

