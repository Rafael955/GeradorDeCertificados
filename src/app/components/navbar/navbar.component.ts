import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule,
    NgClass,
    CommonModule,
    SecondaryButtonComponent
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  id: any = "";
  nomeUsuario: any = "";
  email: any = "";
  perfil: any = "";
  dataHoraAcesso: any = "";

  ngOnInit() {
    const data = sessionStorage.getItem('dadosUsuario');

    const usuario = JSON.parse(data as string);

    this.id = usuario.id;
    this.nomeUsuario = usuario.nomeUsuario;
    this.email = usuario.email;
    this.perfil = usuario.perfil;
    this.dataHoraAcesso = new Date(usuario.dataHoraAcesso);
  }

   logout() {
    sessionStorage.removeItem('dadosUsuario');
    location.href = '/login-usuario';
  }
}
