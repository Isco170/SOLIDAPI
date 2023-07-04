import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";

export class CreateUserUseCase {
    constructor(
        private usersRespository: IUsersRepository
    ){}

    async execute(data: ICreateUserRequestDTO){
        const userAlreadyExists = await this.usersRespository.findByEmail(data.email);

        if(userAlreadyExists){
            throw new Error('User already exists.')
        }

        const user = new User(data)

        await this.usersRespository.save(user);
        
    }
}