import { Hobby } from "../classes/Hobby/Hobby";

export interface IHobbyRepository {
    add(hobbies: string[], student_id: string): Promise<void>;
    find(string: string): Promise<Hobby[]>;
}
