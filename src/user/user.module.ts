import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { DatabaseModule } from 'src/database/database.module';
import { UserController } from './user.controller';
import { userProviders } from './user.providers';
import { UserService } from './user.service';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    DatabaseModule],
  controllers: [UserController],
  providers: [...userProviders ,UserService],
  exports: [UserService]
})
export class UserModule {}
