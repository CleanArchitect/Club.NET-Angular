export type KeyOf<T, TValue> = {
    [TKey in keyof T]: T[TKey] extends TValue ? TKey : never
}[keyof T];