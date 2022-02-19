import { Request, Response } from "express";
import { Docente } from "../../../classes/Docente/Docente";
import { CustomError } from "../../../services/CustomError";
import { CreateTeacherUseCase } from "./createTeacherUseCase";

export class CreateTeacherController {
    constructor(public CreateTeacherUseCase: CreateTeacherUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const { nome, email, data_nasc, turma_id, especialidades } = req.body;

            const teacher = new Docente("", nome, email, data_nasc, turma_id, especialidades);
            await this.CreateTeacherUseCase.execute(teacher);

            res.status(201).send();
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}