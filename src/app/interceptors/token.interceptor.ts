import { HttpInterceptorFn } from '@angular/common/http';
import { config } from '../../environments/environment';

const allowedUrls: string[] = [
  config.certificadosApi_atividades,
  config.certificadosApi_certificados
]

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {

  //ler os dados do usuário gravados na session storage
  const usuario = JSON.parse(sessionStorage.getItem('dadosUsuario') as string);

  //verificar se existe um usuário autenticado e se ele possui um token
  if(usuario != null && usuario.token != null && allowedUrls.some(url => request.url.includes(url))){
   //clonar a requisição e adicionar o token no cabeçalho
   request = request.clone({
    setHeaders: {
      Authorization: `Bearer ${usuario.token}`
    }
   });    
  }

  return next(request);
};
