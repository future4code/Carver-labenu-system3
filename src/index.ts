import { app } from "./app";
import { Request, Response } from "express";
import { createStudentController } from "./controllers/Student/createStudent";
import { getStudentController } from "./controllers/Student/getStudent";
import { changeClassStudentController } from "./controllers/Student/changeClassStudent";
import { createClassController } from "./controllers/Class/createClass";
import { getClassesActiveController } from "./controllers/Class/getClassesActive";
import { changeClassModuleController } from "./controllers/Class/changeClassModule";
import { CreateTeacherController } from "./controllers/Teacher/createTeacher/createTeacherController";
import { createTeacherController } from "./controllers/Teacher/createTeacher";
import { GetTeachersController } from "./controllers/Teacher/getTeachers/getTeachersController";
import { getTeachersController } from "./controllers/Teacher/getTeachers";
import { changeClassTeacherController } from "./controllers/Teacher/changeClassTeacher";

app.post("/estudante", (req: Request, res: Response) => {
    createStudentController.execute(req, res) }
);

app.get("/estudante", (req: Request, res: Response) => {
    getStudentController.execute(req, res); }
);

app.put("/estudante", (req: Request, res: Response) => {
    changeClassStudentController.execute(req, res); }
);

app.post("/turma", (req: Request, res: Response) => {
    createClassController.execute(req, res) }
);

app.get("/turma", (req: Request, res: Response) => {
    getClassesActiveController.execute(req, res) }
);

app.put("/turma", (req: Request, res: Response) => {
    changeClassModuleController.execute(req, res) }
);

app.post("/docente", (req: Request, res: Response) => {
    createTeacherController.execute(req, res) }
);

app.get("/docente", (req: Request, res: Response) => {
    getTeachersController.execute(req, res) }
);

app.put("/docente", (req: Request, res: Response) => {
    changeClassTeacherController.execute(req, res) }
);