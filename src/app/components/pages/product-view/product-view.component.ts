import {Component, Inject, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {IProduct} from "../../../models/product/product";
import {ApiService} from "../../../services/api.service";
import {NgForOf, NgIf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {copyToClipboard, lightenColor} from "../../../helpers/helpers";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    MatTooltip
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit{
  public $subscriptions: Subscription = new Subscription();
  public currentProduct!:IProduct | undefined;
  public productId!: string;
  public allProductsLoaded: boolean = false;
  public copied: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    public apiService: ApiService,
  ) {}

  ngOnInit() {
    this.productId = this.receivedData.productId;
    console.log(`this.productId`)
    console.log(this.productId)

    this.$subscriptions.add(
      this.apiService.allProductsLoaded.subscribe((res) => {
        this.allProductsLoaded = res;

        if(this.allProductsLoaded){
          this.currentProduct = this.apiService.getPopupProductById(this.productId);
          console.log(`this.currentProduct`)
          console.log(this.currentProduct)
        }
      })
    )
  }

  copyLink(){
    copyToClipboard(window.location.href)
    this.copied = true;
    setTimeout(() => {
      this.copied = false;
    }, 1500)
  }

  protected readonly lightenColor = lightenColor;
}
