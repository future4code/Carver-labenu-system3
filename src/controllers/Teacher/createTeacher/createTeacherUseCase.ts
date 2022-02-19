import { CustomError } from "../../../services/CustomError";
import { DefaultDate } from "../../../services/DefaultDate";
import validator from "validator";
import { IClassRepository } from "../../../repositories/IClassRepository";
import { ITeacherRepository } from "../../../repositories/ITeacherRepository";
import { ISpecialtyRepository } from "../../../repositories/ISpecialtyRepository";
import { Docente } from "../../../classes/Docente/Docente";
import { SpecialtyVerify } from "../../../services/SpecialtyVerify";
import { Pessoa } from "../../../classes/Pessoa/Pessoa";

export class CreateTeacherUseCase {
    constructor(
        private ITeacherRepository: ITeacherRepository,
        private ISpecialtyRepository: ISpecialtyRepository,
        private IClassRepository: IClassRepository) { }

    async execute(teacher: Docente): Promise<void> {
        if (typeof teacher.nome !== "string" ||
            !validator.isEmail(teacher.email) ||
            typeof teacher.turma_id !== "string" ||
            typeof teacher.data_nasc !== "string" ||
            !Array.isArray(teacher.especialidades)) {
            throw new CustomError(422, "Parâmetros insuficientes ou inválidos.");
        }
        const defaultDate = new DefaultDate(teacher.data_nasc) as string;
        if (teacher.data_nasc.length !== 10 || !validator.isDate(defaultDate)) {
            throw new CustomError(422, "Data inválida.")
        }
        teacher.data_nasc = defaultDate;

        const teacherAlreadyExists = await this.ITeacherRepository.find("email", teacher.email);
        if (teacherAlreadyExists.length) {
            throw new CustomError(409, "Docente já cadastrado.")
        }

        const classAlreadyExists = await this.IClassRepository.find("id", "=", teacher.turma_id);
        if (!classAlreadyExists.length) {
            throw new CustomError(122, "Turma não existente.")
        }

        if (!new SpecialtyVerify().execute(teacher.especialidades)) {
            throw new CustomError(122, "Especialidade inválida ou repetida. Escolha entre: JS, CSS, React, Typescript, POO")
        }

        const newTeacher = new Pessoa(teacher.id, teacher.nome, teacher.email, teacher.data_nasc, teacher.turma_id);
        await this.ITeacherRepository.create(newTeacher);
        await this.ISpecialtyRepository.add(teacher.especialidades, teacher.id);  
    }
}