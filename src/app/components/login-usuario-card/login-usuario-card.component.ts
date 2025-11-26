import { Component, inject } from '@angular/core';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { Router, RouterLink } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { IAutenticarUsuarioResponse } from '../../interfaces/usuarios/autenticar-usuario-response';
import { IAutenticarUsuarioRequest } from '../../interfaces/usuarios/autenticar-usuario-request';

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

  router = inject(Router);

  private readonly usuarioService = inject(UsuarioService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
    senha: new FormControl('', [Validators.required, Validators.maxLength(20)]),
  })

  onSubmit() {
    this.LimparMensagens();

    const usuarioLogin: IAutenticarUsuarioRequest = {
      email: this.form.value.email as string,
      senha: this.form.value.senha as string
    }

    this.usuarioService.autenticarUsuario(usuarioLogin)
      .subscribe({
        next: (data: IAutenticarUsuarioResponse) => {
          sessionStorage.setItem('dadosUsuario', JSON.stringify(data));
          this.router.navigate(['/certificados']);
        },
        error: (err: any) => {
          console.log(err);

          if(err.error.errorMessages == undefined){
            this.mensagem_erro = 'Não foi possivel autenticar o usuário. Tente novamente.';
          }
          else if(err.error.errorMessages.length > 1){
              this.mensagem_erro = (err.error.errorMessages as string[]).map(item => item).join('\n ') as string;
          }
          else {
            this.mensagem_erro = err.error.errorMessages[0] as string;
          }

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
