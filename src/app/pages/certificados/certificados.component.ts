import { Component, inject, OnInit } from '@angular/core';
import { ItemCertificadoComponent } from "../../components/item-certificado/item-certificado.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';
import { CertificadoService } from '../../services/certificado.service';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { take } from 'rxjs';
import { ICertificadoResponse } from '../../interfaces/certificados/certificado-response';


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

  certificados: ICertificadoResponse[] = [];

  certificadosService = inject(CertificadoService);

  ngOnInit(): void {
    //this.certificados = this.certificadosService.certificados;

    this.certificadosService.listarCertificados()
      .pipe(take(1))
        .subscribe({
          next: (response: ICertificadoResponse[]) => {
                this.certificados = response.sort((a, b) => {
              // Cria um objeto Date de JavaScript a partir da string dataEmissao
                const dataB = new Date(b.dataEmissao).getTime();
                const dataA = new Date(a.dataEmissao).getTime();
                
                // Ordenação Decrescente (Mais Recente Primeiro)
                return dataB - dataA;
              });
          },
          error: (error) => {
             console.log(error);
          }
        });
  }
}
