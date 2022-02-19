import { BaseDatabase } from "../../../database/BaseDatabase";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { ChangeClassModuleUseCase } from "./changeClassStudentUseCase";
import { ChangeClassModuleController } from "./changeClassModuleController";

const database = new BaseDatabase();
const classRepository = new ClassRepository(database);
const changeClassModuleUseCase = new ChangeClassModuleUseCase(classRepository);
export const changeClassModuleController = new ChangeClassModuleController(changeClassModuleUseCase);