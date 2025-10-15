import { Component, inject, OnInit } from '@angular/core';
import { ItemCertificadoComponent } from "../../components/item-certificado/item-certificado.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';
import { Certificado } from '../../interfaces/certificado';
import { CertificadoService } from '../../services/certificado.service';


@Component({
  selector: 'app-certificados',
  imports: [
    ItemCertificadoComponent,
    SecondaryButtonComponent,
    RouterLink
],
  templateUrl: './certificados.component.html',
  styleUrl: './certificados.component.css'
})
export class CertificadosComponent implements OnInit {

  certificados: Certificado[] = [];

  certificadosService = inject(CertificadoService);

  ngOnInit(): void {
    this.certificados = this.certificadosService.certificados;
  }
}
