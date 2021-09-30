import { Inject, Injectable } from '@nestjs/common';
import { ConversationService } from 'src/conversation/conversation.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { createMessageDto } from './createMessage.dto';
import { Message } from './message.entity';

@Injectable()
export class MessageService {

    constructor(
        @Inject("MESSAGE_REPOSITORY") private messageRepository: Repository<Message>,
        private userService: UserService,
        private  conversationService: ConversationService

    ){}

    async create(messageDto: createMessageDto, user: User  ) {
        let newMessage = await this.messageRepository.create()
        let conversation = await this.conversationService.getConversationById(messageDto.chat)
        newMessage.messageBody = messageDto.body
        newMessage.conversation = conversation
        newMessage.user = user
        return  await this.messageRepository.save(newMessage)
    }
}
