import {IProductCategory} from "./category.model";

export interface IProduct {
  id: string,
  category: IProductCategory,
  name: string,
  name_eng?: string,
  price: string,
  description?: string,
  mass?: string,
  image?: string
}
