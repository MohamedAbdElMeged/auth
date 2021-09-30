import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { Message } from './message.entity';


export const MessageProviders = [
    {
        provide: "MESSAGE_REPOSITORY",
        useFactory: (connection: Connection) => connection.getRepository(Message),
        inject: ["DATABASE_CONNECTION"]
    }
] 
