import { BaseDatabase } from "../../../database/BaseDatabase";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { TeacherRepository } from "../../../repositories/Teacher/TeacherRepository";
import { ChangeClassTeacherUseCase } from "./changeClassTeacherUseCase";
import { ChangeClassTeacherController } from "./changeClassTeacherController";

const database = new BaseDatabase();
const teacherRepository = new TeacherRepository(database);
const classRepository = new ClassRepository(database);
const changeClassTeacherUseCase = new ChangeClassTeacherUseCase(teacherRepository, classRepository);
export const changeClassTeacherController = new ChangeClassTeacherController(changeClassTeacherUseCase);