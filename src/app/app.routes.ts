import { Routes } from '@angular/router';
import { CertificadosComponent } from './pages/certificados/certificados.component';
import { CertificadoFormComponent } from './pages/certificado-form/certificado-form.component';
import { CertificadoComponent } from './pages/certificado/certificado.component';
import { LoginUsuarioComponent } from './pages/login-usuario/login-usuario.component';
import { CriarUsuarioComponent } from './pages/criar-usuario/criar-usuario.component';

export const routes: Routes = [
    {
        path: '',
        component: CertificadosComponent
    },
    {
        path: 'certificados/novo',
        component: CertificadoFormComponent
    },
    {
        path: 'certificados/:id',
        component: CertificadoComponent
    },
    {
        path: 'login-usuario',
        component: LoginUsuarioComponent
    },
    {
        path: 'criar-usuario',
        component: CriarUsuarioComponent
    }
];
