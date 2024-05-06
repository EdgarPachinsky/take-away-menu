import { Component } from '@angular/core';
import {NavbarComponent} from "../../parts/navbar/navbar.component";
import {IProductCategory} from "../../../models/product/category.model";
import {CommonModule} from "@angular/common";
import {IProduct} from "../../../models/product/product";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent, CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public borderColor: string | null = null;
  public categories: IProductCategory[] = [
    {
      id: '1',
      name: 'Պիցցաներ',
      text_color: '#3c3a8f'
    },
    {
      id: '2',
      name: 'Բուրգերներ',
      text_color: '#1f8787'
    },
    {
      id: '3',
      name: 'Աղցաններ',
      text_color: '#397a9e'
    },
    {
      id: '4',
      name: 'Տաք Ուտեստներ',
      text_color: '#d16400'
    },
    {
      id: '5',
      name: 'Սառը Ուտեստներ',
      text_color: '#f0493e'
    },
    {
      id: '6',
      name: 'Սեթեր',
      text_color: '#59871f'
    },
  ];


  public products1: IProduct[] = [
    {
      id: '1',
      category: '1',
      name: 'Մարգարիտտա',
      price: '2500',
      mass: 'string',
      image: 'string',
    }
  ]

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
