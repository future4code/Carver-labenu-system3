import { BaseDatabase } from "../../../database/BaseDatabase";
import { HobbyRepository } from "../../../repositories/Hobby/HobbyRepository";
import { StudentRepository } from "../../../repositories/Student/StudentRepository";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { CreateStudentController } from "./createStudentController";
import { CreateStudentUseCase } from "./createStudentUseCase";

const database = new BaseDatabase();
const studentRepository = new StudentRepository(database);
const hobbyRepository = new HobbyRepository(database);
const classRepository = new ClassRepository(database);
const createUseCase = new CreateStudentUseCase(studentRepository, hobbyRepository, classRepository);
export const createStudentController = new CreateStudentController(createUseCase);