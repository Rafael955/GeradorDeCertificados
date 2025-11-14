import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CertificadoService } from '../../services/certificado.service';
import { Certificado } from '../../interfaces/certificado';
import html2canvas from 'html2canvas';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";

@Component({
  selector: 'app-certificado',
  imports: [SecondaryButtonComponent, RouterLink, NavbarComponent, BaseUiComponent],
  templateUrl: './certificado.component.html',
  styleUrl: './certificado.component.css'
})
export class CertificadoComponent implements OnInit {

  id: string | null = null;
  certificado: Certificado | undefined;

  @ViewChild('certificadoContainer') certificadoElement!: ElementRef;

  constructor(
    private certificadoService: CertificadoService, 
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.id = this.route.snapshot.paramMap.get('id') as string;
    //Outra forma:
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.certificado = this.certificadoService.certificados.find(item => item.id == this.id);
    });
  }

  downloadCertificado() {
    if(this.certificado == undefined) return;

    html2canvas(this.certificadoElement.nativeElement, { scale: 2 }).then(
      canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = `certificado_${this.certificado?.nome.replace(' ', '_')}.png`
        link.click();
      }
    )
  }

}
