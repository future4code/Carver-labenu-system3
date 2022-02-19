import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { GetClassesActiveUseCase } from "./getClasseActiveUseCase";

export class GetClassesActiveController {
    constructor(public GetClassesActiveUseCase: GetClassesActiveUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        let errorCode: number = 500;
        try {
            const response = await this.GetClassesActiveUseCase.execute();

            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(errorCode).send({ message: err.message });
            }
        }
    }
}