import { Component } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { FormsModule, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
@Component({
  selector: 'app-certificado-form',
  imports: [
    SecondaryButtonComponent,
    PrimaryButtonComponent,
    FormsModule,
    CommonModule
],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {

  certificado: Certificado = {
    nome: "",
    atividades: []
  }

  atividade: string = "";

  campoInvalido(control: NgModel){
    return control.invalid && control.touched;
  }

  formValido() : boolean {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
    if(this.certificado.nome.length == 0) 
      return;

    this.certificado.atividades.push(this.atividade);
    this.atividade = "";
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  submit(){
    if(this.formValido() == false) return;

    console.log(this.certificado);
  }
}
