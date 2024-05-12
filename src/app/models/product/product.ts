import {IProductCategory} from "./category.model";

export interface IProduct {
  id: string,
  category: IProductCategory,
  name: string,
  name_eng?: string,
  price: number,
  description?: string,
  mass?: number,
  image?: string,
  portion_for?: number
}
