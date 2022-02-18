import { Estudante } from "../../../classes/Estudante/Estudante";
import { IHobbyRepository } from "../../../repositories/IHobbyRepository";
import { IStudentRepository } from "../../../repositories/IStudentRepository";
import { CustomError } from "../../../services/CustomError";
import { DefaultDate } from "../../../services/DefaultDate";
import validator from "validator";
import { IClassRepository } from "../../../repositories/IClassRepository";
import { Pessoa } from "../../../classes/Pessoa/Pessoa";

export class CreateStudentUseCase {
    constructor(
        private IStudentRepository: IStudentRepository,
        private IHobbyRepository: IHobbyRepository,
        private IClassRepository: IClassRepository) { }

    async execute(student: Estudante): Promise<void> {
        if (typeof student.nome !== "string" ||
            !validator.isEmail(student.email) ||
            typeof student.turma_id !== "string" ||
            typeof student.data_nasc !== "string" ||
            !Array.isArray(student.hobbies)) {
            throw new CustomError(422, "Parâmetros insuficientes ou inválidos.");
        }
        const defaultDate = new DefaultDate(student.data_nasc) as string;
        if (student.data_nasc.length !== 10 || !validator.isDate(defaultDate)) {
            throw new CustomError(422, "Data inválida.")
        }
        student.data_nasc = defaultDate;

        const studentAlreadyExists = await this.IStudentRepository.find("email", student.email);
        if (studentAlreadyExists.length) {
            throw new CustomError(409, "Estudante já cadastrado.")
        }

        const classAlreadyExists = await this.IClassRepository.find(student.turma_id);
        if (!classAlreadyExists.length) {
            throw new CustomError(122, "Turma não existente.")
        }

        const newStudent = new Pessoa(student.id, student.nome, student.email, student.data_nasc, student.turma_id);
        await this.IStudentRepository.create(newStudent);
        await this.IHobbyRepository.add(student.hobbies, student.id);  
    }
}