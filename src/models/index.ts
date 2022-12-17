export interface IQuery {
    keyword: string,
    products: IProduct[]
}

interface IProduct {
    title: string,
    url: string,
    price: number,
    image: string,
    competitor: string
}