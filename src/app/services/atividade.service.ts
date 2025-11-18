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

  alterarAtividade(atividade: IAtividadeRequest, idAtividade: string) : Observable<IAtividadeResponse> {
      return this.httpClient.put<IAtividadeResponse>(`${config.certificadosApi_atividades}/alterar-atividade/${idAtividade}`, atividade);
  }

  excluirAtividade(idAtividade: string) : Observable<IAtividadeResponse> {
      return this.httpClient.delete<IAtividadeResponse>(`${config.certificadosApi_atividades}/excluir-atividade/${idAtividade}`);
  }

  obterAtividadePorId(idAtividade: string): Observable<IAtividadeResponse> {
    return this.httpClient.get<IAtividadeResponse>(`${config.certificadosApi_atividades}/obter-atividade/${idAtividade}`);
  }

  listarAtividades(): Observable<IAtividadeResponse[]> {
    return this.httpClient.get<IAtividadeResponse[]>(`${config.certificadosApi_atividades}/listar-atividades`);
  }
}
