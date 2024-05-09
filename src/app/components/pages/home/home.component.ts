import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../parts/navbar/navbar.component";
import {IProductCategory} from "../../../models/product/category.model";
import {CommonModule} from "@angular/common";
import {ApiService} from "../../../services/api.service";
import {Subscription} from "rxjs";
import {FiltrationService} from "../../../services/filtration.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent, CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  public $subscriptions: Subscription = new Subscription();
  public borderColor: string | null = null;

  constructor(
    public apiService: ApiService,
    public filtrationService: FiltrationService,
  ) {

  }

  ngOnInit(){
    this.$subscriptions.add(
      this.apiService.getAllCategories().subscribe((res) => {
      })
    )
    this.$subscriptions.add(
      this.apiService.getAllProducts().subscribe((res) => {
        if(res){
          this.filtrationService.filterProducts(true);
        }
      })
    )
  }

  filterProducts(category: IProductCategory){
    this.filtrationService.selectedCategory = category;

    this.filtrationService.filterProducts()
  }

  lightenColor(hex: string | undefined, percent: number): string {
    if(!hex){
      return ''
    }
    // Remove the '#' from the beginning of the hex string
    hex = hex.replace(/^#/, '');

    // Convert the hex color to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Calculate the percent to lighten each RGB component
    const lightenAmount = Math.round(255 * (percent / 100));

    // Lighten the color
    const newR = Math.min(r + lightenAmount, 255);
    const newG = Math.min(g + lightenAmount, 255);
    const newB = Math.min(b + lightenAmount, 255);

    // Convert the new RGB values back to hexadecimal
    const newHex = '#' + [newR, newG, newB].map(component => {
      const hexValue = component.toString(16);
      return hexValue.length === 1 ? '0' + hexValue : hexValue;
    }).join('');

    return newHex;
  }

  setBorderColor(color: string | undefined): void {
    if(!color){
      return;
    }

    this.borderColor = color;
  }

  removeBorderColor(): void {
    this.borderColor = null;
  }
}
