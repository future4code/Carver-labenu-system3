import { Request, Response } from "express";
import { Estudante } from "../../../classes/Estudante/Estudante";
import { CustomError } from "../../../services/CustomError";
import { GetStudentUseCase } from "./getStudentUseCase";

export class GetStudentController {
    constructor(public GetStudentUseCase: GetStudentUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        let errorCode: number = 500;
        try {
            const nome = req.query.nome;
            const response = await this.GetStudentUseCase.execute(nome as string);

            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(errorCode).send({ message: err.message });
            }
        }
    }
}