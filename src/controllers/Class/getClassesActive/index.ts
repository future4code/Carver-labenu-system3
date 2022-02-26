import { BaseDatabase } from "../../../database/BaseDatabase";
import { ClassRepository } from "../../../repositories/Class/ClassRepository";
import { GetClassesActiveUseCase } from "./getClasseActiveUseCase";
import { GetClassesActiveController } from "./getClassesActiveController";

const database = new BaseDatabase();
const classRepository = new ClassRepository(database);
const getClasseActiveUseCase = new GetClassesActiveUseCase(classRepository);
export const getClassesActiveController = new GetClassesActiveController(getClasseActiveUseCase);