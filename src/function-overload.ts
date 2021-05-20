type Reservation = {};

// Reserve1 と Reserve2 は同じ意味の型
type Reserve1 = (from: Date, to: Date, destination: string) => Reservation;
type Reserve2 = {
    (from: Date, to: Date, destination: string): Reservation
};
const reserve1: Reserve1 = (from, to, destination) => {
    return {};
}
const reserve2: Reserve2 = (from, to, destination) => {
    return {};
}

// 呼び出しシグネチャのオーバーロード
type Reserve3 = {
    (from: Date, to: Date, destination: string): Reservation
    (from: Date, destination: string): Reservation
};
const reserve3: Reserve3 = (from: Date, toOrDestination: Date | string, destination?: string) => {
    return {};
}

// HTML Element の createElement などによく用いられる
type CreateElement = {
    (tag: 'a'): HTMLAnchorElement
    (tag: 'canvas'): HTMLAnchorElement
    (tag: 'table'): HTMLAnchorElement
    (tag: string): HTMLAnchorElement
}
const createElement: CreateElement = (tag) => {
    return {} as HTMLAnchorElement;
}

// 関数のオーバーロード
function createElement2(tag: 'a'): HTMLAnchorElement
function createElement2(tag: 'canvas'): HTMLAnchorElement
function createElement2(tag: 'table'): HTMLAnchorElement
function createElement2(tag: string): HTMLAnchorElement {
    return {} as HTMLAnchorElement;
}

// プロパティを含めた関数型
type WarnUser = {
    (warning: string): void;
    wasCalled: boolean;
}
const warnUser: WarnUser = warning => {
    if (warnUser.wasCalled) {
        return;
    }
    alert(warning)
    warnUser.wasCalled = true;
}
warnUser.wasCalled = false;

// type Filter = {
//     (array: number[], f: (item: number) => boolean): number[]
//     (array: object[], f: (item: object) => boolean): object[]
// }
// const filter: Filter = (array, f) => {
//     return array.filter(f);
// }