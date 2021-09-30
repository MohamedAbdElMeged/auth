import { Conversation } from "src/conversation/conversation.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    messageBody: string;
    @ManyToOne(()=>Conversation)
    conversation: Conversation;
    @ManyToOne(() => User)
    user: User;
    @Column("timestamptz",{default: new Date()})
    createdAt: string
}
