import { BaseDatabase } from "../../../database/BaseDatabase";
import { StudentRepository } from "../../../repositories/Student/StudentRepository";
import { GetStudentController } from "./getStudentController";
import { GetStudentUseCase } from "./getStudentUseCase";

const database = new BaseDatabase();
const studentRepository = new StudentRepository(database)
const getStudentUseCase = new GetStudentUseCase(studentRepository);
export const getStudentController = new GetStudentController(getStudentUseCase);