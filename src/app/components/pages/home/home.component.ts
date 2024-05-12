import {Component, OnInit} from '@angular/core';
import {NavbarComponent} from "../../parts/navbar/navbar.component";
import {IProductCategory} from "../../../models/product/category.model";
import {CommonModule} from "@angular/common";
import {ApiService} from "../../../services/api.service";
import {Subscription} from "rxjs";
import {FiltrationService} from "../../../services/filtration.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IProduct} from "../../../models/product/product";
import {MatDialog} from "@angular/material/dialog";
import {ProductViewComponent} from "../product-view/product-view.component";
import {lightenColor} from "../../../helpers/helpers";

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
    public router: Router,
    private route: ActivatedRoute,
    private matDialog: MatDialog,
  ) {}

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

    this.$subscriptions.add(
      this.route.queryParams.subscribe(params => {
        const productId = params['productId'];
        if (productId) {
          let productViewComponentRef = this.matDialog.open(ProductViewComponent ,{
            data: {
              productId
            }
          });
          productViewComponentRef.afterClosed().subscribe((res) => {
            this.clearRouteParams();
          })
        }
      })
    )
  }

  filterProducts(category: IProductCategory){
    this.filtrationService.selectedCategory = category;

    this.filtrationService.filterProducts()

    this.clearRouteParams();
  }
  setBorderColor(color: string | undefined): void {
    if(!color){
      return;
    }

    this.borderColor = color;
  }

  openProductView(product:IProduct){
    // this.router.navigate([`/product/${product.id}`])
    const queryParams = {
      productId: product.id,
    };

    this.router.navigate([], {
      queryParams,
    });
  }

  clearRouteParams(){
    this.router.navigate(['/'], {
      queryParams: {
        productId: null
      },
      queryParamsHandling: 'merge'
    });
  }

  removeBorderColor(): void {
    this.borderColor = null;
  }

  protected readonly lightenColor = lightenColor;
}
