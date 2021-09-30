import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(
        private messageService: MessageService
    ){}


    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async create(@Req() req , @Res() res){
        return await res.json(await this.messageService.create(req.body, req.user))
        
    }
    
}
