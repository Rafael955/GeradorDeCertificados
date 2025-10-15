import { Component, Input } from '@angular/core';
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-certificado',
  imports: [
    SecondaryButtonComponent,
    CommonModule
  ],
  templateUrl: './item-certificado.component.html',
  styleUrl: './item-certificado.component.css'
})
export class ItemCertificadoComponent {
  @Input() nomeAluno: string = '';
  @Input() dataEmissao: string = '';
  @Input() id: string = '';

  constructor(private router: Router) {}

  redirecionaCertificado() {
    //Duas maneiras de redirecionar
    this.router.navigate(['certificados', this.id]);
    // this.router.navigateByUrl('certificados/6');
    // this.router.navigateByUrl('certificados/' + this.id);
  }
};
