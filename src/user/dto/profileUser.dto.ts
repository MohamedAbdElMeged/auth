export class profileUserDto {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    token: string;

    constructor(id,email,firstName,lastName,token?){
        this.id = id;
        this.firstName= firstName;
        this.lastName= lastName;
        this.email = email;
        token ? this.token = token : null

    }
}