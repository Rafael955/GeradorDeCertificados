import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CertificadoService } from './services/certificado.service';
import { MaxLengthDirective } from './directives/max-length.directive';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'gerador-certificado';
  exibeNavbar: boolean = true;

  // certificadoService = inject(CertificadoService);
  
  ngOnInit(): void {
    // const certificados = localStorage.getItem('certificados');
    // this.certificadoService.certificados = certificados ? JSON.parse(certificados) : [];
  }
}
