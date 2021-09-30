import { Conversation } from 'src/conversation/conversation.entity';
import { Message } from 'src/message/message.entity';
import { User } from 'src/user/user.entity';
import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => await createConnection({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'chat',
      entities: [
          //__dirname + '/dist/../**/*.entity{.ts,.js}',
          User,Conversation,Message
      ],
      synchronize: true,
    }),
  },
];