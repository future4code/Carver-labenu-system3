import { app } from "./app";
import { CreateStudent } from "./endpoints/Student/createStudent";

const createStudent = new CreateStudent();
app.post("/student", createStudent.post);