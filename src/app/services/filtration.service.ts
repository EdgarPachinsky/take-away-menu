import { Injectable } from '@angular/core';
import {ApiService} from "./api.service";
import {IProduct} from "../models/product/product";
import {IProductCategory} from "../models/product/category.model";

@Injectable({
  providedIn: 'root'
})
export class FiltrationService {

  selectedCategory!: IProductCategory;
  typedCriteria!: string;

  constructor(
    public apiService: ApiService
  ) { }

  filterProducts(directAssignToAll: boolean = false, dropCategoryToAll: boolean = false){
    if(directAssignToAll){
      this.apiService.products = [...this.apiService.allProducts];
      return;
    }

    if(dropCategoryToAll){
      this.selectedCategory = this.apiService.allCategoryObject;
    }

    this.apiService.products = this.apiService.allProducts.filter((item: IProduct) => {
      return ((this.selectedCategory && item.category.id === this.selectedCategory.id) || this.selectedCategory?.name_eng === 'all' || !this.selectedCategory) &&
        (item.name.trim().toLowerCase().includes(this.typedCriteria?.trim().toLowerCase() || '') ||
          item.name_eng?.trim().toLowerCase()?.includes(this.typedCriteria.trim()?.toLowerCase() || ''));
    });
  }
}
