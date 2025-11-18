import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-atividades',
  imports: [
    NavbarComponent, 
    BaseUiComponent, 
    SecondaryButtonComponent,
    RouterLink
  ],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css'
})
export class AtividadesComponent {

  atividades: any[] = [];

  ngOnInit(): void {

  }
}
