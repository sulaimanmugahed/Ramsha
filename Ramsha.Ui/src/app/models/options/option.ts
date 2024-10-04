export type Option = {
    id: string,
    name: string,
    values: OptionValue[]
}

export type Options = Option[]



export type OptionValue = {
    id: string,
    name: string,
}