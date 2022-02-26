export class SpecialtyVerify {
    execute(specialties: string[]): boolean {
        const fixedSpecialties = ["JS", "CSS", "React", "Typescript", "POO"];
        let result: boolean = true;
        const specialtyList: string[] = [];
        for (let i = 0; i < specialties.length; i++) {
            if (!fixedSpecialties.includes(specialties[i]) || specialtyList.includes(specialties[i])) {
                result = false;
            }
            else {
                specialtyList.push(specialties[i])
            }
        }
        return result;
    }
}