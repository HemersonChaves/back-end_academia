import { UniqueEntityID } from ".";

class UniqueIDIntConcretMock extends UniqueEntityID<number> {
    generateID(): number {
        return 123;
    }
}
export { UniqueIDIntConcretMock };
