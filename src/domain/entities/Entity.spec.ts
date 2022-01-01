import { Entity } from ".";

interface IProps {
    prop_a: string;
    prop_b: unknown;
    prop_c: number;
}
class EntityConcret<T> extends Entity<T> {}
describe("Entity", () => {
    test("should entity instanced with any types props and id", () => {
        const props: IProps = {
            prop_a: "props",
            prop_b: false,
            prop_c: 123,
        };
        const id = "any_id";
        const SysUnderTest = new EntityConcret(props, id);
        expect(SysUnderTest).toBeInstanceOf(Entity);
    });
    test("should entity instanced without id", () => {
        const props: IProps = {
            prop_a: "props",
            prop_b: false,
            prop_c: 123,
        };
        const SysUnderTest = new EntityConcret(props);
        expect(SysUnderTest).toBeInstanceOf(Entity);
        expect(SysUnderTest.getId()).toBe(undefined);
    });
});
