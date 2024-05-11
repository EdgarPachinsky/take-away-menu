import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {IProduct} from "../../../models/product/product";
import {ApiService} from "../../../services/api.service";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-product-view',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent implements OnInit{
  public $subscriptions: Subscription = new Subscription();
  public currentProduct!:IProduct | undefined;
  public productId!: string;
  public allProductsLoaded: boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public receivedData: any,
    private router: Router,
    private route: ActivatedRoute,
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

    // this.$subscriptions.add(
    //   this.route.params.subscribe(params => {
    //     const id = params['id'];
    //     this.getProductFromService(id);
    //   })
    // )
  }

  getProductFromService(productId: string){
    // this.currentProduct = this.apiService.allProducts.find((el) => el.id === productId);
    //
    // if(!this.currentProduct){
    //   this.router.navigate(['/product-not-found'])
    // }
  }
}
