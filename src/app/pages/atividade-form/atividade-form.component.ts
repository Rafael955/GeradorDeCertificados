import { Component, ViewChild } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AtividadeService } from '../../services/atividade.service';
import { IAtividadeRequest } from '../../interfaces/atividades/atividade-request';
import { CommonModule } from '@angular/common';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { take } from 'rxjs';
import { MaxLengthDirective } from '../../directives/max-length.directive';

@Component({
  selector: 'app-atividade-form',
  imports: [
    NavbarComponent,
    BaseUiComponent,
    FormsModule,
    CommonModule,
    PrimaryButtonComponent,
    MaxLengthDirective
],
  templateUrl: './atividade-form.component.html',
  styleUrl: './atividade-form.component.css'
})
export class AtividadeFormComponent {
@ViewChild('form') form! : NgForm

  mensagem_erro: string = "";
  mensagem_sucesso: string = "";

  constructor(
    private atividadeService: AtividadeService) {}

  atividade: IAtividadeRequest = {
    nome: ""
  }

  campoInvalido(control: NgModel){
    return control.invalid && control.touched;
  }

  // NOVA FUNÇÃO: Retorna a mensagem de erro específica para o campo 'nome'
  getMensagemErroNome(campo: NgModel): string | null {
    if (campo.errors) {
      if (campo.errors['required']) {
        return 'O nome da atividade é obrigatório';
      }
      // Aqui, tratamos os erros de tamanho. Como discutido, o 'maxlength' nativo 
      // do HTML bloqueia o 'maxlength' do Angular, mas o 'minlength' funciona.
      if (campo.errors['appMaxLength']) {
        return 'O nome da atividade deve ter no máximo 150 caracteres';
      }
      if (campo.errors['minlength']) {
        return 'O nome da atividade deve ter no mínimo 2 caracteres';
      }
    }
    // Retorna null se não houver erro
    return null;
  }

  formValido(form: NgForm) : boolean {
    if(form.invalid) 
      return false;

    return true;
  }

  onSubmit(){
    if(this.formValido(this.form) == false) return;

    const atividadeNova : IAtividadeRequest = {
      nome: this.atividade.nome
    }

    this.atividadeService.cadastrarAtividade(atividadeNova)
      .pipe(take(1))
        .subscribe({
          next:(response: any) => {
            this.mensagem_sucesso = `A atividade ${response.nome} foi cadastrada com sucesso!`;
            this.atividade = this.resetFormulario();
            this.form.reset();
          },
          error: (err: any) => {
            console.log(err);
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

  resetFormulario() : IAtividadeRequest {
    return {
      nome: ""
    }
  }
}
