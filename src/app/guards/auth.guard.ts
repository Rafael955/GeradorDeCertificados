import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

const adminOnlyRoutes: string[] = [
  '/atividade/nova-atividade',
  '/atividade/edicao-atividade/'
];

export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const usuario = JSON.parse(sessionStorage.getItem('dadosUsuario') as string);

  if (usuario !== null && isJwtExpired(usuario.token) == false) {

        if (adminOnlyRoutes.some(url => state.url.includes(url))) {
          if (usuario.perfil === 'Administrador') {
            return true;
          } else {
            router.navigate(['/errors/unauthorized']);
            return false;
          }
        }

        return true;
      }

      router.navigate(['/login-usuario']);
      return false;
};

function isJwtExpired(token: string): boolean {
  const payload = JSON.parse(atob(token.split('.')[1]));

  const exp = payload.exp * 1000;

  return Date.now() > exp;
}
