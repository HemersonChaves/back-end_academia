import {
    UniqueEntityID,
    UniqueIDIntConcretMock,
    UniqueIDStringConcretMock,
} from ".";

class UniqueIDIntConcret extends UniqueEntityID<number> {
    generateID(): number {
        return 123;
    }
}
describe("UniqueEntityID", () => {
    test("should UniqueEntityID instanced with string params", () => {
        const idstring = "123";
        const SysUnderTest = new UniqueIDStringConcretMock(idstring);

        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
        expect(SysUnderTest.toValue()).toBe(idstring);
    });
    test("should UniqueEntityID instanced with number params", () => {
        const idNumber = 123;
        const SysUnderTest = new UniqueIDIntConcretMock(idNumber);

        expect(SysUnderTest).toBeInstanceOf(UniqueEntityID);
        expect(SysUnderTest).toBeTruthy();
        expect(SysUnderTest.toValue()).toBe(idNumber);
    });
    test("should return casting toString UniqueEntityID", () => {
        const SysUnderTest = new UniqueIDIntConcret(123);
        expect(SysUnderTest.toString()).toBe("123");
    });
    test("should return false if isIdentifier not UniqueEntityID", () => {
        expect(UniqueIDIntConcret.isIdentifier(123)).toBeFalsy();
    });
    test("should return true if isIdentifier not UniqueEntityID", () => {
        const SysUnderTest = new UniqueIDIntConcret(123);
        expect(UniqueIDIntConcret.isIdentifier(SysUnderTest)).toBeTruthy();
    });
    test("should return false if not eguals UniqueEntityID", () => {
        const SysUnderTest1 = new UniqueIDIntConcret(123);
        const SysUnderTest2 = new UniqueIDIntConcret(456);
        console.log(SysUnderTest1.equals(SysUnderTest2));
        expect(SysUnderTest1.equals(SysUnderTest2)).toBeFalsy();
    });
    test("should return true if not eguals UniqueEntityID", () => {
        const SysUnderTest1 = new UniqueIDIntConcret(123);
        const SysUnderTest2 = new UniqueIDIntConcret(123);
        console.log(SysUnderTest1.equals(SysUnderTest2));
        expect(SysUnderTest1.equals(SysUnderTest2)).toBeTruthy();
    });
});
