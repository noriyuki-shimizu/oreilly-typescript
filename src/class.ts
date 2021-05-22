class ExSet<T> {
    protected value: Set<T>

    protected constructor(value: Set<T>) {
        this.value = value;
    }

    static of<T>(value: Set<T>): ExSet<T> {
        return new this(value);
    }

    has(value: T): boolean {
        return this.value.has(value)
    }

    add(value: T): this {
        this.value.add(value)
        return this
    }
}

class SubSet<T> extends ExSet<T> {
    private constructor(value: Set<T>) {
        super(value);
    }

    static of<T>(value: Set<T>): SubSet<T> {
        return new this(value);
    }

    subMethod(): void {
        // ...
    }
}

const subSet = SubSet.of(new Set([111]));
subSet.add(222).subMethod();

// utility types
class MyClass {
    constructor(
        readonly id: number
    ) {}
}
type MyClassType = InstanceType<typeof MyClass>
const my: MyClassType = {
    id: 111
}
// my.id = 222; // error

// mixin
type ClassConstructor<T> = new(...args: any[]) => T;
interface DebugValue {
    getDebugValue(): object
}

function withEZDebug<C extends ClassConstructor<DebugValue>>(Class: C) {
    return class extends Class {
        debug() {
            let Name = this.constructor.name;
            let value = this.getDebugValue();
            return `${Name} (${JSON.stringify(value)})`;
        }
    }
}
class HardToDebugUser implements DebugValue {
    constructor(
        private id: number,
        private firstName: string,
        private lastName: string
    ) {}
    getDebugValue() {
        return {
            id: this.id,
            name: `${this.firstName} ${this.lastName}`
        }
    }
}
let User = withEZDebug(HardToDebugUser);
let user = new User(3, 'shimizu', 'noriyuki');
user.debug();
