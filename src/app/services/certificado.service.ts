import { inject, Injectable } from '@angular/core';
import { Certificado } from '../interfaces/certificados/certificado';
import { ICertificadoResponse } from '../interfaces/certificados/certificado-response';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { config } from '../../environments/environment';
import { ICertificadoRequest } from '../interfaces/certificados/certificado-request';

@Injectable({
  providedIn: 'root'
})
export class CertificadoService {

  private readonly httpClient = inject(HttpClient);

  //certificados: Certificado[] = [];

  // adicionarCertificado(certificado: Certificado) {
  //   this.certificados.unshift({...certificado}); 
  //   localStorage.setItem('certificados', JSON.stringify(this.certificados));
  // }

  criarCertificado(certificado: ICertificadoRequest) : Observable<ICertificadoResponse> {
    return this.httpClient.post<ICertificadoResponse>(`${config.certificadosApi_certificados}/criar-certificado`, certificado);
  }

  obterCertificado(idCertificado: string) : Observable<ICertificadoResponse> {
    return this.httpClient.get<ICertificadoResponse>(`${config.certificadosApi_certificados}/obter-certificado/${idCertificado}`);
  }

  listarCertificados() : Observable<ICertificadoResponse[]> {
    return this.httpClient.get<ICertificadoResponse[]>(`${config.certificadosApi_certificados}/listar-certificados`);
  }
}
