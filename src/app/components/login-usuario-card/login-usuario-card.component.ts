import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { config } from '../../../environments/environment';

@Component({
  selector: 'app-login-usuario-card',
  imports: [
    PrimaryButtonComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './login-usuario-card.component.html',
  styleUrl: './login-usuario-card.component.css'
})
export class LoginUsuarioCardComponent {

  mensagem_erro: string = "";

  httpClient = inject(HttpClient);
  router = inject(Router);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  })

  onSubmit() {
    this.LimparMensagens();
    
    this.httpClient.post(`${config.certificadosApi_usuarios}/login`, this.form.value)
    .subscribe({
      next: (data: any) => {
        console.log(data);
        sessionStorage.setItem('dadosUsuario', JSON.stringify(data));
        this.router.navigate(['']);
      },
      error: (error) => {
        this.mensagem_erro = error.message as string;
      }
    });
  }

   LimparMensagens() {
    this.mensagem_erro = '';
  }

  onFocus() {
    this.LimparMensagens();
  }
  
}
