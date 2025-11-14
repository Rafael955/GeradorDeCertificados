import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registro-usuario-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PrimaryButtonComponent,
    RouterLink
],
  templateUrl: './registro-usuario-card.component.html',
  styleUrl: './registro-usuario-card.component.css'
})
export class RegistroUsuarioCardComponent {

  
  form = new FormGroup({
      nomeUsuario: new FormControl('', []),
      email: new FormControl('', []),
      senha: new FormControl('', []),
      confirmaSenha: new FormControl('', []),
  });

  onSubmit() {
    console.log("Teste Submit");
  }
}
