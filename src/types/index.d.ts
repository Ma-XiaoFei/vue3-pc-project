declare namespace CommonType {
    interface BaseObject<T = any> {
        [k: string]: T
    }
}