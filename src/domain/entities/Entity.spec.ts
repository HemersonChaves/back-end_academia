import { Entity } from ".";

interface IProps {
    prop_a: string;
    prop_b: unknown;
    prop_c: number;
}
class EntityConcret<T> extends Entity<T> {}
describe("Entity", () => {
    test("should entity instance with any types props and id", () => {
        const props: IProps = {
            prop_a: "props",
            prop_b: false,
            prop_c: 123,
        };
        const id = "any_id";
        const SysUnderTest = new EntityConcret(props, id);
        expect(SysUnderTest).toBeInstanceOf(Entity);
        console.log(SysUnderTest.getId());
    });
});
