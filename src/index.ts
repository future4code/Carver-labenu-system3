import { app } from "./app";
import { Request, Response } from "express";
import { createStudentController } from "./controllers/Student/createStudent";
import { getStudentController } from "./controllers/Student/getStudent";
import { changeClassStudentController } from "./controllers/Student/changeClassStudent";
import { createClassController } from "./controllers/Class/createClass";
import { getClassesActiveController } from "./controllers/Class/getClassesActive";
import { changeClassModuleController } from "./controllers/Class/changeClassModule";

app.post("/student", (req: Request, res: Response) => {
    createStudentController.execute(req, res) }
);

app.get("/student", (req: Request, res: Response) => {
    getStudentController.execute(req, res); }
);

app.put("/student", (req: Request, res: Response) => {
    changeClassStudentController.execute(req, res); }
);

app.post("/class", (req: Request, res: Response) => {
    createClassController.execute(req, res) }
);

app.get("/class", (req: Request, res: Response) => {
    getClassesActiveController.execute(req, res) }
);

app.put("/class", (req: Request, res: Response) => {
    changeClassModuleController.execute(req, res) }
);