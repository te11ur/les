export type Pick<T, E extends keyof T> = {
    [K in E]: T[K];
}

interface Todo {
    title: string
    description: string
    completed: boolean
}

type Test1 = Pick<Todo, "title">;
const test1 = {} as Test1;
test1.title //Ok
test1.description //Error


export type Readonly<T> = {
    readonly [K in keyof T]: T[K]
}

type Test2 = Readonly<Todo>
const test2 = {} as Test2;
test2.title = "f"//error

export type TupleToObject<T extends readonly string[]> = {
    [E in T[number]]: E
}

const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const;
type Test3 = TupleToObject<typeof tuple>
const test3 = {} as Test3;
test3["model X"]


export type First<T extends any[]> = T[0]

type arr1 = ['a', 'b', 'c']
type arr2 = [3, 2, 1]
type Test4 = First<arr1>
type Test4a = First<arr2>
const test4: Test4 = "a"
const test4a: Test4a = 3


export type Length<T extends any[]> = T["length"]

type tesla = ['tesla', 'model 3', 'model X', 'model Y']
type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAGON', 'STARSHIP', 'HUMAN SPACEFLIGHT']
type teslaLength = Length<tesla>
type spaceXLength = Length<spaceX>
const test5: teslaLength = 4
const test5a: spaceXLength = 5


export type Exclude<T, K> = T extends K ? never : T;
type Test6 = Exclude<'a' | 'b' | 'c', 'a'>;
let test6: Test6 = 'b';
test6 = 'a';//error

export type Awaited<T> = T extends Promise<infer K> ? K : never
type ExampleType = Promise<string>
type Test7 = Awaited<ExampleType> // string
const test7 = {} as Test7;
typeof test7 === "string"

export type If<A extends boolean, R1 extends any, R2 extends any> = A extends true ? R1 : R2;
type A = If<true, 'a', 'b'>
type B = If<false, 'a', 'b'>


export type Concat<A extends any[], B extends any[]> = [...A, ...B]
type Test8 = Concat<[1], [2]>


export type Includes<T extends any[], K> = K extends T[number] ? true : false;
type isPillarMen = Includes<['Kars', 'Esidisi', 'Wamuu', 'Santana'], 'Dio'>


export type Push<T extends any[], K> = [...T, K];
type Test9 = Push<[1, 2], '3'>


export type Unshift<T extends any[], K> = [K, ...T];
export type Test10 = Unshift<[1, 2], 0>


export type Parameters<T> = T extends (...args: infer K) => any ? [...K] : never;
const foo = (arg1: string, arg2: number): void => {
}
type Test11 = Parameters<typeof foo>


export type ReturnType<T> = T extends (...args: any[]) => infer K ? K : never;
const fn = (v: boolean) => {
    if (v)
        return 1
    else
        return 2
}
type Test12 = ReturnType<typeof fn>


export type Omit<T, K> = {
    [P in keyof T as P extends K ? never : P]: T[P]
};
type Test13 = Omit<Todo, 'description' | 'title'>
const test13: Test13 = {
    completed: false,
}


export type Readonly2<T, K> = {
    [P in keyof T as P extends K ? never : P]: T[P]
} & {
    readonly [P in keyof T as P extends K ? P : never]: T[P]
}

const test14: Readonly2<Todo, 'title' | 'description'> = {
    title: "Hey",
    description: "foobar",
    completed: false,
}

test14.title = "Hello" // Error
test14.description = "barFoo" // Error
test14.completed = true //


export type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K]
}

type X = {
    x: {
        a: 1
        b: 'hi'
    }
    y: 'hey'
}
type Test15 = DeepReadonly<X>
const test15 = {} as Test15
test15.x = "g"// Error
test15.x.a = "g"// Error


export type TupleToUnion<T extends any[]> = T[number]

type Arr = ['1', '2', '3']
type Test16 = TupleToUnion<Arr>


export type Last<T extends any[]> = T extends [...args: any[], last: infer K] ? K : never

type tail1 = Last<arr1>
type tail2 = Last<arr2>


export type Pop<T extends any[]> = T extends [...args: infer _, last: any] ? _ : never

type re1 = Pop<arr1>
type re2 = Pop<arr2>


export type LookUp<T, K> = T extends { type: K } ? T : never

interface Cat {
    type: 'cat'
    breeds: 'Abyssinian' | 'Shorthair' | 'Curl' | 'Bengal'
}

interface Dog {
    type: 'dog'
    breeds: 'Hound' | 'Brittany' | 'Bulldog' | 'Boxer'
    color: 'brown' | 'white' | 'black'
}

type Test17 = LookUp<Cat | Dog, 'dog'>


export type TrimLeft<T> = T extends `${" "}${infer K}` ? TrimLeft<K> : T
type test18 = TrimLeft<'  Hello World  '>

export type Trim<T> = T extends `${" "}${infer K}${" "}` ? Trim<K> : T
type test19 = Trim<'  Hello World  '>


export type AppendArgument<T, K> = T extends (a: infer A) => infer P
    ? (a: A, b: K) => P
    : T extends (a: infer A, b: infer B) => infer P ? (a: A, b: B, c: K) => P : T
type Fn = (a: number, b: string) => number
type Test20 = AppendArgument<Fn, boolean>

export type Merge<T, K> = {
    [S in keyof T as S extends keyof K ? never : S]: T[S]
} & {
    [S in keyof K]: K[S]
}

type foo = {
    name: string
    age: string
}
type coo = {
    age: number
    sex: string
}
type Result = Merge<foo, coo>
const test21 = {} as Result;
typeof test21.age === "number"//OK


