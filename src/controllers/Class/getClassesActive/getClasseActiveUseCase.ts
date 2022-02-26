import { TurmaData } from "../../../classes/Turma/Turma";
import { IClassRepository } from "../../../repositories/IClassRepository";

export class GetClassesActiveUseCase {
    constructor(private IClassRepository: IClassRepository) { }

    async execute(): Promise<any> {

        const response: TurmaData[] = await this.IClassRepository.find("modulo", ">", "0");
        const getStudents = await this.IClassRepository.get(response);  
        return getStudents;
    }
}