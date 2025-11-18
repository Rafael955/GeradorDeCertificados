import { inject, Injectable } from '@angular/core';
import { IAtividadeRequest } from '../interfaces/atividades/atividade-request';
import { Observable } from 'rxjs';
import { IAtividadeResponse } from '../interfaces/atividades/atividade-response';
import { HttpClient } from '@angular/common/http';
import { config } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {
  
  private readonly httpClient = inject(HttpClient);

  cadastrarAtividade(atividade: IAtividadeRequest) : Observable<IAtividadeResponse> {
      return this.httpClient.post<IAtividadeResponse>(`${config.certificadosApi_atividades}/cadastrar-atividade`, atividade);
    }
}
