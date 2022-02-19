import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { ChangeClassStudentUseCase } from "./changeClassStudentUseCase";

export class ChangeClassStudentController {
    constructor(public ChangeClassStudentUseCase: ChangeClassStudentUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { id, turma_id } = req.body;

            await this.ChangeClassStudentUseCase.execute(id, turma_id);

            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}