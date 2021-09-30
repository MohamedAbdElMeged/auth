import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { createUserDto } from './dto/createUser.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { profileUserDto } from './dto/profileUser.dto';

export class UserService {
constructor(
    @Inject("USER_REPOSITORY") private userRepository: Repository<User>,
    @Inject(forwardRef(() => AuthService))private authService: AuthService
    
){}

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({email})
    }
    async findAll() {
        return await this.userRepository.find()
    }
    async getUserById(id:number){
        return await this.userRepository.findOne({id})
    }

    async register(createDto: createUserDto) {
        const encryptedPassword = await bcrypt.hash(createDto.password, 10)
        createDto.password = encryptedPassword
        const user = await this.userRepository.save(createDto)
       const token = await this.authService.createToken(user)
       const profileDto = new profileUserDto(user.id,user.email,user.firstName,user.lastName,token)
       return await profileDto;
    }
    
}
