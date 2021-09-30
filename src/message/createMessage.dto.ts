import { IsNotEmpty, IsNumber } from "class-validator";

export class createMessageDto {
    @IsNotEmpty()
    body: string;

    @IsNotEmpty()
    @IsNumber()
    chat: number;
}