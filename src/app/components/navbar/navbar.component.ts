import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterModule,
    NgClass
],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  ngOnInit() {
    this.mensagem();
  }
  
  mensagem() {
    console.log("Meu componente navbar inicializou!");
  }
}
