import { BaseDatabase } from "../../../database/BaseDatabase";
import { HobbyRepository } from "../../../repositories/Hobby/HobbyRepository";
import { StudentRepository } from "../../../repositories/Student/StudentRepository";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { CreateClassUseCase } from "./createClassUseCase";
import { CreateClassController } from "./createClassController";
import { TeacherRepository } from "../../../repositories/Teacher/TeacherRepository";

const database = new BaseDatabase();
const studentRepository = new StudentRepository(database);
const classRepository = new ClassRepository(database);
const teacherRepository = new TeacherRepository(database);
const createClassUseCase = new CreateClassUseCase(studentRepository, classRepository, teacherRepository);
export const createClassController = new CreateClassController(createClassUseCase);
