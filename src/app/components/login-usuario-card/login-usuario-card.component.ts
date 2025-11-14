import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-usuario-card',
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
],
  templateUrl: './login-usuario-card.component.html',
  styleUrl: './login-usuario-card.component.css'
})
export class LoginUsuarioCardComponent {

  form = new FormGroup({
    email: new FormControl('', []),
    senha: new FormControl('', []),
  })

  onSubmit() {
    console.log("Teste Submit");
  }
}
