import { Request, Response } from "express";
import { Turma } from "../../../classes/Turma/Turma";
import { CustomError } from "../../../services/CustomError";
import { CreateClassUseCase } from "./createClassUseCase";

export class CreateClassController {
    constructor(public CreateClassUseCase: CreateClassUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        let errorCode: number = 500;
        try {
            const { nome, docentes, estudantes } = req.body;

            const turma = new Turma("", nome, docentes, estudantes, 0);
            await this.CreateClassUseCase.execute(turma);

            res.status(201).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(errorCode).send({ message: err.message });
            }
        }
    }
}