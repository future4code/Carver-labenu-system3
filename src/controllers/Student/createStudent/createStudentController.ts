import { Request, Response } from "express";
import { Estudante } from "../../../classes/Estudante/Estudante";
import { CustomError } from "../../../services/CustomError";
import { CreateStudentUseCase } from "./createStudentUseCase";

export class CreateStudentController {
    constructor(public CreateStudentUseCase: CreateStudentUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        let errorCode: number = 500;
        try {
            const { nome, email, data_nasc, turma_id, hobbies } = req.body;

            const student = new Estudante("", nome, email, data_nasc, turma_id, hobbies);
            await this.CreateStudentUseCase.execute(student);

            res.status(201).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(errorCode).send({ message: err.message });
            }
        }
    }
}