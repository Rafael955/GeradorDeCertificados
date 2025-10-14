import { Component, OnInit } from '@angular/core';
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CertificadoService } from '../../services/certificado.service';
import { Certificado } from '../../interfaces/certificado';

@Component({
  selector: 'app-certificado',
  imports: [SecondaryButtonComponent, RouterLink],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.css'
})
export class CertificadoComponent implements OnInit {

  id: string | null = null;
  certificado: Certificado | undefined;
  constructor(
    private certificadoService: CertificadoService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id') as string;
    //Outra forma:
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.certificado = this.certificadoService.certificados.find(item => item.id == this.id);
      console.log(this.certificado);
    });
  }

}
