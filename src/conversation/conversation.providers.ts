import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Conversation } from './conversation.entity';


export const ConversationProviders=[ {
    provide: "CONVERSATION_REPOSITORY",
    useFactory: (connection: Connection) => connection.getRepository(Conversation),
    inject: ["DATABASE_CONNECTION"] 
}
]