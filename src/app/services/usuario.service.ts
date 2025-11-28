import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAutenticarUsuarioResponse } from '../interfaces/usuarios/autenticar-usuario-response';
import { Observable, Subject, tap } from 'rxjs';
import { config } from '../../environments/environment';
import { IAutenticarUsuarioRequest } from '../interfaces/usuarios/autenticar-usuario-request';
import { IRegistrarUsuarioRequest } from '../interfaces/usuarios/registrar-usuario-request';
import { IRegistrarUsuarioResponse } from '../interfaces/usuarios/registrar-usuario-response';
import { IUsuarioResponseDto } from '../interfaces/usuarios/usuario-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly _httpClient = inject(HttpClient);

  private userDeletedSource = new Subject<string>();
  userDeleted$ = this.userDeletedSource.asObservable();

  notifyUserDeleted(id: string) {
    this.userDeletedSource.next(id);
  }


  autenticarUsuario(usuario: IAutenticarUsuarioRequest) : Observable<IAutenticarUsuarioResponse> {
    return this._httpClient.post<IAutenticarUsuarioResponse>(`${config.certificadosApi_usuarios}/login`, usuario)
  }

  criarUsuario(usuario: IRegistrarUsuarioRequest) : Observable<IRegistrarUsuarioResponse> {
    return this._httpClient.post<IRegistrarUsuarioResponse>(`${config.certificadosApi_usuarios}/criar-usuario`, usuario)
  }

  excluirUsuario(idUsuario: string): Observable<void> {
    return this._httpClient.delete<void>(`${config.certificadosApi_usuarios}/excluir-usuario/${idUsuario}`).pipe(tap(() => this.notifyUserDeleted(idUsuario)));
  }

  listarUsuarios(): Observable<IUsuarioResponseDto[]> {
    return this._httpClient.get<IUsuarioResponseDto[]>(`${config.certificadosApi_usuarios}/listar-usuarios`);
  }
}
