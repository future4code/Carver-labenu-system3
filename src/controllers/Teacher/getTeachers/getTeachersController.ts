import { Request, Response } from "express";
import { CustomError } from "../../../services/CustomError";
import { GetTeachersUseCase } from "./getTeachersUseCase";

export class GetTeachersController {
    constructor(public GetTeachersUseCase: GetTeachersUseCase) { }

    async execute(req: Request, res: Response): Promise<void> {
        try {
            const response = await this.GetTeachersUseCase.execute();

            res.status(201).send(response);
        } catch (err) {
            if (err instanceof CustomError) {
                res.status(err.statusCode).send({ message: err.message });
            }
        }
    }
}