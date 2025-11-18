import { Component, inject, OnInit } from '@angular/core';
import { ItemCertificadoComponent } from "../../components/item-certificado/item-certificado.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';
import { Certificado } from '../../interfaces/certificados/certificado';
import { CertificadoService } from '../../services/certificado.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { take } from 'rxjs';


@Component({
  selector: 'app-certificados',
  imports: [
    ItemCertificadoComponent,
    SecondaryButtonComponent,
    RouterLink,
    NavbarComponent,
    BaseUiComponent
],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.css'
})
export class CertificadosComponent implements OnInit {

  certificados: Certificado[] = [];

  certificadosService = inject(CertificadoService);

  ngOnInit(): void {
    //this.certificados = this.certificadosService.certificados;

    this.certificadosService.listarCertificados()
      .pipe(take(1))
        .subscribe({
          next: (response: any) => {
            this.certificados = response;
          },
          error: (error) => {
             console.log(error);
          }
        });
  }
}
