import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { ChangeClassTeacherUseCase } from "./changeClassTeacherUseCase";

export class ChangeClassTeacherController {
    constructor(public ChangeClassTeacherUseCase: ChangeClassTeacherUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { id, turma_id } = req.body;

            await this.ChangeClassTeacherUseCase.execute(id, turma_id);

            res.status(200).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}