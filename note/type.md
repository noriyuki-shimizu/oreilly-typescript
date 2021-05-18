* any  
  * 型のゴットファーザ。プログラマーや TypeScript がわからない場合のデフォルトの型が any となる。これは最後の手段の型であり、 **できるだけ避けるべき**。  
  * 自分が何をするのかが明確な場合のみ、例外的に使用していい型となる  
  * any 型を使用するということは JavaScript を記述すると宣言しているようなもの  

* unknown  
  * TypeScript が何かを unknown と推論することはない。明示的な型アノテーションが必要  
  * unknown 型の値と他の値を比較することができる  
  * unknown 値が特定の型であることを想定した事柄は行えない。初めに、値が本当にその型であることを TypeScript に示す必要がある  
  * 全ての型のスーパータイプ  

* number  
  * 大きい数値をわかりやすく表現するように心がけること
```ts
const a: number = 1_000_000
```

* bigint
  * 2^53 以上の number を扱う際に使用する型

```ts
const a: bigint = 100n
```

* symbol  
  * unique symbol は、他のリテラル型（1, true, "literal!" など）と同様に考えること。unique symbol は symbol の特定の「住民」を表す型を作成するための方法  

```ts
const a: unique symmbol = Symbol('a')
```

* object  
  * object は、それが表現する値について多くを語らず、その値が JavaScript のオブジェクトであること（及び、それが null 出ないこと）だけを伝える  

```ts
type A = {
  readonly arg1: string;
  arg2?: number
}
```

|  値  |  {}  |  object  |  Object  |
| ---- | ---- | ---- | ---- |
|  {}  |  はい |  はい  |  はい  |
|  ['a']  |  はい  |  はい  |  はい  |
|  function () {}  |  はい  |  はい  |  はい  |
|  new String('a')  |  はい  |  はい  |  はい  |
|  'a'  |  はい  |  いいえ  |  はい  |
|  1  |  はい  |  いいえ  |  はい  |
|  Symbol('a')  |  はい  |  いいえ  |  はい  |
|  null  |  いいえ  |  いいえ  |  いいえ  |
|  undefined  |  いいえ  |  いいえ  |  いいえ  |

* array  
```ts
// tupple
const a: [number, string]
const b: [number, string?]
const c: [number, ...string[]]

// readonly
const a: readonly string[]
const b: ReadonlyArray<string>
const c: Readonly<string[]>
```

* void  
  * 明示的に何も返さない関数の戻り値の型  

* never  
  * 決して戻ることのない関数の型（例外をスローする関数や、永久に実行される関数など）  
  * 全ての型のサブタイプである
