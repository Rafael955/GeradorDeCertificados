import { Component } from '@angular/core';
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-certificado',
  imports: [
    SecondaryButtonComponent
  ],
  templateUrl: './item-certificado.component.html',
  styleUrl: './item-certificado.component.css'
})
export class ItemCertificadoComponent {
  id: string = '6';

  constructor(private router: Router) {}

  redirecionaCertificado() {
    //Duas maneiras de redirecionar
    this.router.navigate(['certificados', this.id]);
    // this.router.navigateByUrl('certificados/6');
    // this.router.navigateByUrl('certificados/' + this.id);
  }
};
