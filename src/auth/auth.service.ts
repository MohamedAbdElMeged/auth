import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { loginUserDto } from './loginUser.dto';
import * as bcrypt from "bcrypt"
import { User } from 'src/user/user.entity';
import { profileUserDto } from 'src/user/dto/profileUser.dto';
@Injectable()
export class AuthService {
    validateToken(jwt: any) {
        return this.jwtService.verify(jwt);
    }
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(loginDto: loginUserDto) {
        const user = await this.userService.getUserByEmail(loginDto.email)
        if(user){
            const isValidPassword = await bcrypt.compare(loginDto.password, user.password)
            if(isValidPassword){
                const token = await this.createToken(user)
                const profileDto = new profileUserDto(user.id,user.email,user.firstName,user.lastName,token)
                return await profileDto;
            }else{
            throw new Error("Invalid Password");

            }
        }else{
            throw new Error("User Not found");
        }
    }

    async createToken(user: User){
        const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

        return await this.jwtService.sign(payload)
    }
}
