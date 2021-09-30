import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConversationService } from './conversation.service';

@Controller('conversation')
export class ConversationController {
    constructor(
        private conversationService: ConversationService
    ){}

    @UseGuards(JwtAuthGuard)
    @Post("/create")
    async create(@Req() req , @Res() res){
        return await res.json(await this.conversationService.create(req.user, req.body ))
    }

    @Get()
    async getConve(@Res() res){
        return await res.json({conversations: await this.conversationService.getConversations()})
    }
}
