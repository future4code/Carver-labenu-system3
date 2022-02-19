import { CustomError } from "../../../services/CustomError";
import { IClassRepository } from "../../../repositories/IClassRepository";

export class ChangeClassModuleUseCase {
    constructor(private IClassRepository: IClassRepository) { }

    async execute(turma_id: string, modulo: number): Promise<void> {
        if (!turma_id || isNaN(modulo)) {
            throw new CustomError(422, "Parâmetros insuficientes.");
        }

        const classAlreadyExists = await this.IClassRepository.find("id", "=", turma_id);
        if (!classAlreadyExists.length) {
            throw new CustomError(422, "Turma não existente.")
        }


        if (modulo < 0 || modulo > 6) {
            throw new CustomError(422, "Insira um módulo entre 0 (não começou) a 6.");
        }
;
        if (classAlreadyExists[0].modulo == modulo) {
            throw new CustomError(422, "Turma já pertence a este modulo.")
        }

        await this.IClassRepository.update(turma_id, modulo);
    }
}