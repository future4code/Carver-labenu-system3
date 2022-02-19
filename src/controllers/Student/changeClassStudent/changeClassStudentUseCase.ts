import { IStudentRepository } from "../../../repositories/IStudentRepository";
import { CustomError } from "../../../services/CustomError";
import { IClassRepository } from "../../../repositories/IClassRepository";

export class ChangeClassStudentUseCase {
    constructor(
        private IStudentRepository: IStudentRepository,
        private IClassRepository: IClassRepository) { }

    async execute(estudante_id: string, turma_id: string): Promise<void> {
        if (!estudante_id || !turma_id) {
            throw new CustomError(422, "Parâmetros insuficientes.");
        }

        const studentAlreadyExists = await this.IStudentRepository.find("id", estudante_id);
        if (!studentAlreadyExists.length) {
            throw new CustomError(409, "Estudante não cadastrado.")
        }

        const classAlreadyExists = await this.IClassRepository.find("id", "=", turma_id);
        if (!classAlreadyExists.length) {
            throw new CustomError(422, "Turma não existente.")
        }

       if (studentAlreadyExists[0].turma_id === turma_id) {
        throw new CustomError(409, "Estudante já pertence a esta turma.")
       }

       await this.IStudentRepository.update("id", estudante_id, "turma_id", turma_id);
    }
}