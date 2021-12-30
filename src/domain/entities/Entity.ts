interface IEntity<T> {
    getId: () => T;
}
abstract class Entity<T> implements IEntity<T> {
    protected readonly id!: T;
    protected props: T;
    constructor(props: T, id?: T) {
        if (id) {
            this.id = id;
        }
        this.props = props;
    }
    getId(): T {
        return this.id;
    }
}

export { Entity };
