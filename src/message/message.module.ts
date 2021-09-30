import { forwardRef, Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { MessageProviders } from './message.provider';
import { DatabaseModule } from 'src/database/database.module';
import { ConversationModule } from 'src/conversation/conversation.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[DatabaseModule, forwardRef(() => UserModule), forwardRef(() => ConversationModule)],
  controllers: [MessageController],
  providers: [MessageService, ...MessageProviders],
  exports: [MessageService]
})
export class MessageModule {}
