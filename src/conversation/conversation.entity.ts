import { Message } from "src/message/message.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Conversation {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToMany(()=> User)
    @JoinTable()
    users: User[];
    @Column("timestamptz",{default: new Date()})
    createdAt: string
    @OneToMany(() => Message, message => message.conversation)
    messages: Message[];
}
