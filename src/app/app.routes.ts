import { Routes } from '@angular/router';
import { CertificadosComponent } from './pages/certificados/certificados.component';
import { CertificadoFormComponent } from './pages/certificado-form/certificado-form.component';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { LoginUsuarioComponent } from './pages/login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { AtividadeFormComponent } from './pages/atividade-form/atividade-form.component';
import { AtividadeEdicaoFormComponent } from './pages/atividade-edicao-form/atividade-edicao-form.component';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './errors/unauthorized/unauthorized.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';

export const routes: Routes = [
    {
        path: 'login-usuario',
        component: LoginUsuarioComponent
    },
    {
        path: 'criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: 'usuarios',
        component: UsuariosComponent
    },
    {
        path: 'certificados',
        component: CertificadosComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'certificados/novo-certificado',
        component: CertificadoFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'certificados/:id',
        component: CertificadoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'atividades',
        component: AtividadesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'atividade/nova-atividade',
        component: AtividadeFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'atividade/edicao-atividade/:id',
        component: AtividadeEdicaoFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'errors/unauthorized',
        component: UnauthorizedComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login-usuario'
    }
];
