import { CustomError } from "../../../services/CustomError";
import { IClassRepository } from "../../../repositories/IClassRepository";
import { ITeacherRepository } from "../../../repositories/ITeacherRepository";

export class ChangeClassTeacherUseCase {
    constructor(
        private ITeacherRepository: ITeacherRepository,
        private IClassRepository: IClassRepository) { }

    async execute(docente_id: string, turma_id: string): Promise<void> {
        if (!docente_id || !turma_id) {
            throw new CustomError(422, "Parâmetros insuficientes.");
        }

        const teacherAlreadyExists = await this.ITeacherRepository.find("id", docente_id);
        if (!teacherAlreadyExists.length) {
            throw new CustomError(409, "Docente não cadastrado.")
        }

        const classAlreadyExists = await this.IClassRepository.find("id", "=", turma_id);
        if (!classAlreadyExists.length) {
            throw new CustomError(422, "Turma não existente.")
        }

       if (teacherAlreadyExists[0].turma_id === turma_id) {
        throw new CustomError(409, "Docente já pertence a esta turma.")
       }

       await this.ITeacherRepository.update("id", docente_id, "turma_id", turma_id);
    }
}