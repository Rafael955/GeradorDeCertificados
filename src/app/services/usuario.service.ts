import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IAutenticarUsuarioResponse } from '../interfaces/usuarios/autenticar-usuario-response';
import { Observable } from 'rxjs';
import { config } from '../../environments/environment';
import { IAutenticarUsuarioRequest } from '../interfaces/usuarios/autenticar-usuario-request';
import { IRegistrarUsuarioRequest } from '../interfaces/usuarios/registrar-usuario-request';
import { IRegistrarUsuarioResponse } from '../interfaces/usuarios/registrar-usuario-response';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private readonly _httpClient = inject(HttpClient);

  autenticarUsuario(usuario: IAutenticarUsuarioRequest) : Observable<IAutenticarUsuarioResponse> {
    return this._httpClient.post<IAutenticarUsuarioResponse>(`${config.certificadosApi_usuarios}/login`, usuario)
  }

  criarUsuario(usuario: IRegistrarUsuarioRequest) : Observable<IRegistrarUsuarioResponse> {
    return this._httpClient.post<IRegistrarUsuarioResponse>(`${config.certificadosApi_usuarios}/criar-usuario`, usuario)
  }
}
