import { Component } from '@angular/core';
import {FiltrationService} from "../../../services/filtration.service";
import {FormsModule} from "@angular/forms";
import {ApiService} from "../../../services/api.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  constructor(
    public apiService: ApiService,
    public filtrationService: FiltrationService,
  ) {
  }
}
