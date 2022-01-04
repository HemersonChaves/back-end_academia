interface IEntity<T> {
    getId: () => string;
}
abstract class Entity<T> implements IEntity<T> {
    protected readonly id!: string;
    protected props: T;
    constructor(props: T, id?: string) {
        if (id) {
            this.id = id;
        }
        this.props = props;
    }
    getId(): string {
        return this.id;
    }
}

export { Entity };
