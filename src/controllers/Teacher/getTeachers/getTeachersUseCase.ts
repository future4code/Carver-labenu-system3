import { Docente } from "../../../classes/Docente/Docente";
import { Pessoa } from "../../../classes/Pessoa/Pessoa";
import { ITeacherRepository } from "../../../repositories/ITeacherRepository";

export class GetTeachersUseCase {
    constructor (private ITeacherRepository: ITeacherRepository) {}

    async execute (): Promise<Docente[]> {
  
        const response: Pessoa[] = await this.ITeacherRepository.find("", "");
        const getSpecialty = await this.ITeacherRepository.get(response);
        return getSpecialty;
    }
}