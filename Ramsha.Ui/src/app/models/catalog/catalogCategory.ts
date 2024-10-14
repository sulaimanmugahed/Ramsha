export type CatalogCategory = {
    id: string
    parentId: string
    label: string,
    imageUrl: string,
    numberOfProducts: number
    hasChildren: boolean
}