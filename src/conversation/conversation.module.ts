import { forwardRef, Module } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { ConversationController } from './conversation.controller';
import { ConversationProviders } from './conversation.providers';
import { DatabaseModule } from 'src/database/database.module';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports:[DatabaseModule,forwardRef(() => UserModule)],
  providers: [ConversationService, ...ConversationProviders],
  controllers: [ConversationController],
  exports: [ConversationService]

})
export class ConversationModule {}
