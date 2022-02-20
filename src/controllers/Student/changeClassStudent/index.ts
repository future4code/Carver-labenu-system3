import { BaseDatabase } from "../../../database/BaseDatabase";
import { StudentRepository } from "../../../repositories/Student/StudentRepository";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { ChangeClassStudentUseCase } from "./changeClassStudentUseCase";
import { ChangeClassStudentController } from "./changeClassStudentController";

const database = new BaseDatabase();
const studentRepository = new StudentRepository(database);
const classRepository = new ClassRepository(database);
const changeClassStudentUseCase = new ChangeClassStudentUseCase(studentRepository, classRepository);
export const changeClassStudentController = new ChangeClassStudentController(changeClassStudentUseCase);