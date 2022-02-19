import { BaseDatabase } from "../../../database/BaseDatabase";
import { TeacherRepository } from "../../../repositories/Teacher/TeacherRepository";
import { GetTeachersController } from "./getTeachersController";
import { GetTeachersUseCase } from "./getTeachersUseCase";

const database = new BaseDatabase();
const teacherRepository = new TeacherRepository(database)
const getTeachersUseCase = new GetTeachersUseCase(teacherRepository);
export const getTeachersController = new GetTeachersController(getTeachersUseCase);