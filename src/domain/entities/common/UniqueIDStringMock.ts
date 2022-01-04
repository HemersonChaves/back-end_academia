import { UniqueEntityID } from ".";

class UniqueIDStringConcretMock extends UniqueEntityID<string> {
    generateID(): string {
        return "new string()";
    }
}
export { UniqueIDStringConcretMock };
