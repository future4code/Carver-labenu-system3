import { app } from "./app";
import { Request, Response } from "express";
import { createStudentController } from "./controllers/Student/createStudent";
import { getStudentController } from "./controllers/Student/getStudent/index,";

app.post("/student", (req: Request, res: Response) => {
    createStudentController.execute(req, res)
}
);

app.get("/student", (req: Request, res: Response) => {
    getStudentController.execute(req, res);
}
);