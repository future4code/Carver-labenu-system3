import { BaseDatabase } from "../../../database/BaseDatabase";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { TeacherRepository } from "../../../repositories/Teacher/TeacherRepository";
import { SpecialtyRepository } from "../../../repositories/Specialty/SpecialtyRepository";
import { CreateTeacherUseCase } from "./createTeacherUseCase";
import { CreateTeacherController } from "./createTeacherController";

const database = new BaseDatabase();
const teacherRepository = new TeacherRepository(database);
const specialtyRepository = new SpecialtyRepository(database);
const classRepository = new ClassRepository(database);
const createTeacherUseCase = new CreateTeacherUseCase(teacherRepository, specialtyRepository, classRepository);
export const createTeacherController = new CreateTeacherController(createTeacherUseCase);