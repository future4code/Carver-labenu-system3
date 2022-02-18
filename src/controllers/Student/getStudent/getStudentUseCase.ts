import { Estudante } from "../../../classes/Estudante/Estudante";
import { Pessoa } from "../../../classes/Pessoa/Pessoa";
import { IStudentRepository } from "../../../repositories/IStudentRepository";
import { CustomError } from "../../../services/CustomError";

export class GetStudentUseCase {
    constructor (private IStudentRepository: IStudentRepository) {}

    async execute (nome: string): Promise<Estudante[] | any> {
        if (!nome) {
            throw new CustomError(422, "Parâmetro inválido.")
        }
        const response: Pessoa[] = await this.IStudentRepository.find("nome", `%${nome}%`);
        const getHobbies = await this.IStudentRepository.get(response);
        return ;
    }
}