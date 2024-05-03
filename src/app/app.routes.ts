import { Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {ProductViewComponent} from "./components/pages/product-view/product-view.component";
import {AboutComponent} from "./components/pages/about/about.component";
import {ContactComponent} from "./components/pages/contact/contact.component";

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product/:id', component: ProductViewComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: HomeComponent }
];
