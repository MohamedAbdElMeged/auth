import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { Conversation } from './conversation.entity';

@Injectable()
export class ConversationService {

    constructor(
        @Inject("CONVERSATION_REPOSITORY")
        private conversationRepository: Repository<Conversation>,
        private userService: UserService
    ){}

    async create(user1: User, user2: any){
         user2 = user2.user;
         user2 = await this.userService.getUserById(user2)
        let newConv = await this.conversationRepository.create(); 
        newConv.users = [user1,user2]
       return await this.conversationRepository.save(newConv)
    }
    
    async getConversationById(id:number){
        return await this.conversationRepository.findOne({id})
    }
    async getConversations() {
    //  return await this.conversationRepository.find({relations: ["users","messages"]})
    return await this.conversationRepository.createQueryBuilder("conv")
    .leftJoinAndSelect("conv.users","users")
    .leftJoinAndSelect("conv.messages","message")
    .leftJoinAndSelect("message.user","user")
    .getMany()
    }
}
