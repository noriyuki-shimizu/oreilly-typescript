// keyof
type KeyOf = {
    id: number;
    obj: {
        key1: string
    }
}
type Key = keyof KeyOf['id']

// Record
type RecordSample = Record<'id' | 'name', 'taro'>

// mapped type
type Account = {
    id: number;
    isEmployee: boolean;
    notes: string[];
}
type OptionalAccount = {
    [K in keyof Account]?: Account[K];
}
type RequiredAccount = {
    [K in keyof OptionalAccount]-?: Account[K];
}
type ReadonlyAccount = {
    readonly [K in keyof Account]: Account[K];
}
type NotReadonlyAccount = {
    -readonly [K in keyof ReadonlyAccount]: ReadonlyAccount[K];
}

// 型のブランド化
type CompanyID = string & { readonly brand: unique symbol };
type OrderID = string & { readonly brand: unique symbol };
type UserID = string & { readonly brand: unique symbol };
type ID = CompanyID | OrderID | UserID;

function CompanyID(id: string) {
    return id as CompanyID;
}
function OrderID(id: string) {
    return id as OrderID;
}
function UserID(id: string) {
    return id as UserID;
}

function queryForUser(id: UserID) {
    // ...
}

const companyId = CompanyID('5678sdf76f');
const orderId = OrderID('999wer56d87');
const userId = UserID('df567mn9u');

queryForUser(userId)
// queryForUser(companyId) // error

// Optional
interface Option<T> {
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Option<U>): Option<U>
    getOrElse(value: T): T
}
class Some<T> implements Option<T> {
    constructor(private value: T) { }
    flatMap<U>(f: (value: T) => None): None
    flatMap<U>(f: (value: T) => Some<U>): Some<U>
    flatMap<U>(f: (value: T) => Option<U>): Option<U> {
        return f(this.value);
    }
    getOrElse(): T {
        return this.value;
    }
}
class None implements Option<never> {
    flatMap(): None {
        return this;
    }
    getOrElse<U>(value: U): U {
        return value;
    }
}

function Optional<T>(value: null | undefined): None
function Optional<T>(value: T): Some<T>
function Optional<T>(value: T): Option<T> {
    if (value == null) {
        return new None;
    }
    return new Some(value);
}

let result = Optional(null)