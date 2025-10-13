import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
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
