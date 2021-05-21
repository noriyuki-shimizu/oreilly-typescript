// array prototype map
var arr = [111, 222, 333];
const mappingArr = arr.map<string>(a => String(a));

interface A {
    id: number;
    name: string;
}
interface B extends A {
    age: number
}
const aa: A[] = [
    {
        id: 1,
        name: 'taro'
    }
];
const bb = aa.filter<B>((a): a is B => 'name' in a);

// array prototype reduce
type User = {
    id: number;
    name: string;
}
type UserParameter = {
    key: keyof User;
    value: User[keyof User]
}
const objArr: UserParameter[] = [
    {
        key: 'id',
        value: 111
    },
    {
        key: 'name',
        value: 'taro'
    }
]
objArr.reduce<User>((a, c) => {
    return Object.assign(a, { [c.key]: c.value })
}, {id: 0, name: ''})

// call method 割と傑作🤩
type CallbackArg<T> = T extends (...args: infer U) => unknown ? U : never;
type Callback<T extends unknown[], R> = (...args: T) => R;
type Call = <T extends unknown[], R>(f: Callback<T, R>, ...args: CallbackArg<Callback<T, R>>) => ReturnType<Callback<T, R>>

const callback: Callback<string[], string> = (arg1, arg2) => {
    return `${arg1}: ${arg2}`;
}
const call: Call = (f, ...args) => f(...args)

// call(callback, 1, 2, 3, '') // error
call(callback, 'arg1', 'arg2')

// default generic type
type MyEvent<T extends HTMLElement = HTMLElement> = {
    target: T;
    type: string;
}