import {Injectable} from '@angular/core';
import {IProductCategory} from "../models/product/category.model";
import {IProduct} from "../models/product/product";
import {BehaviorSubject, delay, Observable, of, Subscription, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public $subscriptions: Subscription = new Subscription();

  loadingProducts: boolean = false;
  loadingCategories: boolean = false;

  categories: IProductCategory[] = [];

  allProducts: IProduct[] = []; // this will store all data got from back end
  products: IProduct[] = []; // this is filtered products that is dynamically changing in page

  allProductsLoaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  getAllCategories(): Observable<IProductCategory[]> {
    this.loadingCategories = true;
    this.categories = [];

    //TODO: request to back end
    // assign value to this.categories
    this.categories = [
      {
        id: '1',
        name: 'Պիցցաներ',
        name_eng: 'pizza',
        text_color: '#3c3a8f'
      },
      {
        id: '2',
        name: 'Բուրգերներ',
        name_eng: 'burger',
        text_color: '#1f8787'
      },
      {
        id: '3',
        name: 'Աղցաններ',
        name_eng: 'axcanner',
        text_color: '#397a9e'
      },
      {
        id: '4',
        name: 'Տաք Ուտեստներ',
        name_eng: 'taq utestner',
        text_color: '#d16400'
      },
      {
        id: '5',
        name: 'Սառը Ուտեստներ',
        name_eng: 'sar utestner',
        text_color: '#f0493e'
      },
      {
        id: '6',
        name: 'Սեթեր',
        name_eng: 'seter',
        text_color: '#59871f'
      },
    ]

    this.categories.unshift(this.allCategoryObject)

    return of(this.categories).pipe(delay(2000), tap(() => {
      this.loadingCategories = false;
    }))
  }

  getAllProducts(): Observable<boolean> {
    this.loadingProducts = true;
    this.products = [];

    //TODO: request to back end
    // assign value to this.products
    this.allProducts = [
      {
        id: '1',
        category: {
          id: '1',
          name: 'Պիցցաներ',
          name_eng: 'pizza',
          text_color: '#3c3a8f'
        },
        name: 'Մարգարիտտա',
        name_eng: 'margarita',
        price: 2500,
        mass: 9.6,
        description: 'որեմ Իպսումը տպագրության և տպագրական արդյունաբերության համար նախատեսված մոդելային տեքստ է։ Սկսած 1500-ականներից՝ Լորեմ Իպսումը հանդիսացել է տպագրական արդյունաբերության ստանդարտ մոդելային տեքստ, ինչը մի անհայտ տպագրիչի կողմից տարբեր տառատեսակների օրինակների գիրք ստեղծելու ջանքերի արդյունք է',
        image: '../../../../assets/images/img.png',
      },
      {
        id: '2',
        category: {
          id: '1',
          name: 'Պիցցաներ',
          name_eng: 'pizza',
          text_color: '#3c3a8f'
        },
        name: 'Ալտոնո',
        name_eng: 'altono',
        price: 3000,
        mass: 25,
        image: '../../../../assets/images/img_2.png',
      },
      {
        id: '3',
        category: {
          id: '4',
          name: 'Տաք Ուտեստներ',
          name_eng: 'taq utest',
          text_color: '#d16400'
        },
        name: 'Ապուր Ֆրանսիական',
        name_eng: 'apur fransiakan',
        price: 700,
        mass: 78,
        image: '../../../../assets/images/img_1.png',
      },
      {
        id: '4',
        category: {
          id: '4',
          name: 'Տաք Ուտեստներ',
          name_eng: 'taq utest',
          text_color: '#d16400'
        },
        name: 'Սթեյք',
        name_eng: 'steak',
        price: 700,
        mass: 50,
        image: '../../../../assets/images/img_4.png',
      },
      {
        id: '5',
        category: {
          id: '6',
          name: 'Սեթեր',
          name_eng: 'seter',
          text_color: '#59871f'
        },
        name: 'Սեթ Մեծ',
        name_eng: 'set mec',
        price: 1700.2,
        mass: 50.3,
        image: '../../../../assets/images/img_3.png',
      }
    ]

    return of(true).pipe(delay(2000), tap(() => {
      this.loadingProducts = false;
      this.allProductsLoaded.next(true);
    }))
  }

  getPopupProductById(id: string) {
    return this.allProducts.find((el) => el.id === id);
  }

  get allCategoryObject() {
    return {
      id: '__all__',
      name: 'Բոլորը',
      name_eng: 'all',
      text_color: '#34ff00'
    }
  }
}
