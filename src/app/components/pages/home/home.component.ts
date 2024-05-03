import { Component } from '@angular/core';
import {NavbarComponent} from "../../parts/navbar/navbar.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}