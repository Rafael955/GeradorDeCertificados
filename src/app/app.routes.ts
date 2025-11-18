import { Routes } from '@angular/router';
import { CertificadosComponent } from './pages/certificados/certificados.component';
import { CertificadoFormComponent } from './pages/certificado-form/certificado-form.component';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { LoginUsuarioComponent } from './pages/login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';
import { AtividadesComponent } from './pages/atividades/atividades.component';
import { AtividadeFormComponent } from './pages/atividade-form/atividade-form.component';

export const routes: Routes = [
    {
        path: 'certificados',
        component: CertificadosComponent
    },
    {
        path: 'certificados/novo-certificado',
        component: CertificadoFormComponent
    },
    {
        path: 'certificados/:id',
        component: CertificadoComponent
    },
    {
        path: 'atividades',
        component: AtividadesComponent
    },
    {
        path: 'atividade/nova-atividade',
        component: AtividadeFormComponent
    },
    {
        path: 'login-usuario',
        component: LoginUsuarioComponent
    },
    {
        path: 'criar-usuario',
        component: CriarUsuarioComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login-usuario'
    }
];
