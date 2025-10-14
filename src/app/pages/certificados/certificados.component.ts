import { Component } from '@angular/core';
import { ItemCertificadoComponent } from "../../components/item-certificado/item-certificado.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-certificados',
  imports: [
    SecondaryButtonComponent,
    RouterLink
],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.css'
})
export class CertificadosComponent {

}
