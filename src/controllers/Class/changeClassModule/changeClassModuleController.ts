import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { ChangeClassModuleUseCase } from "./changeClassStudentUseCase";

export class ChangeClassModuleController {
    constructor(public ChangeClassModuleUseCase: ChangeClassModuleUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { turma_id, modulo } = req.body;

            await this.ChangeClassModuleUseCase.execute(turma_id, modulo);

            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}