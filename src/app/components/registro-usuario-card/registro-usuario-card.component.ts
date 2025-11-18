import { Component, inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IRegistrarUsuarioRequest } from '../../interfaces/usuarios/registrar-usuario-request';
import { UsuarioService } from '../../services/usuario.service';
import { IRegistrarUsuarioResponse } from '../../interfaces/usuarios/registrar-usuario-response';

@Component({
  selector: 'app-registro-usuario-card',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    PrimaryButtonComponent,
    RouterLink,
    CommonModule
],
  templateUrl: './registro-usuario-card.component.html',
  styleUrl: './registro-usuario-card.component.css'
})
export class RegistroUsuarioCardComponent {
  mensagem_sucesso: string = '';
  mensagem_erro: string = ''; 

  form = new FormGroup({
      nomeUsuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      senha: new FormControl('', [Validators.required, Validators.maxLength(20), 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
      ]),
      confirmaSenha: new FormControl('', [Validators.required])
    },
    {
      validators: (abstractControl: AbstractControl) => {
        let senha = abstractControl.get('senha')?.value;
        let confirmaSenha = abstractControl.get('confirmaSenha')?.value;

        if(confirmaSenha != null && confirmaSenha.length > 0 && confirmaSenha != senha) {
          abstractControl.get('confirmaSenha')?.setErrors({
            matchPassword: true
          });
        }

        return null;
      }
    });

  usuarioService = inject(UsuarioService);

  onSubmit() {
    if(this.form.invalid) return;

    this.mensagem_sucesso = '';
    this.mensagem_erro = '';

    const usuarioNovo: IRegistrarUsuarioRequest = {
      nomeUsuario: this.form.value.nomeUsuario as string,
      email: this.form.value.email as string,
      senha: this.form.value.senha as string,
      perfil: '2' as string //Usuário comum
    }

    this.usuarioService.criarUsuario(usuarioNovo)
      .subscribe({
        next: (data: IRegistrarUsuarioResponse) => {
          this.mensagem_sucesso = `Usuário ${data.nomeUsuario} cadastrado com sucesso!`;
          this.form.reset();
        },
         error: (err: any) => {
          console.log(err.error.errorMessages);

          if(err.error.errorMessages.length > 1){
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
    this.mensagem_sucesso = '';
  }

  onFocus() {
    this.LimparMensagens();
  }
}
