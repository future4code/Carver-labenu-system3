import { Request, Response } from "express";
import { BaseDatabase } from "../../data/BaseDatabase";

export class CreateStudent {
    async post(req: Request, res: Response): Promise<void> {
        let errorCode: number = 500;
        try {

            const users = "...";
            const DB = new BaseDatabase();
            await DB.connection("Users").insert(users);
            
            res.status(200).send("Olá mundo");
        } catch (err) {
            if (err instanceof Error) {
                res.status(errorCode).send({ message: err.message });
            }
        }
    }
}