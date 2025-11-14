import { Component, ViewChild } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificado';
import { CertificadoService } from '../../services/certificado.service';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";

@Component({
  selector: 'app-certificado-form',
  imports: [
    SecondaryButtonComponent,
    PrimaryButtonComponent,
    FormsModule,
    CommonModule,
    NavbarComponent,
    BaseUiComponent
],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {
  @ViewChild('form') form! : NgForm

  constructor(
    private certificadoService: CertificadoService,
    private route: Router) {}

  certificado: Certificado = {
    id: "",
    nome: "",
    atividades: [],
    dataEmissao: ""
  }

  atividade: string = "";

  campoInvalido(control: NgModel){
    return control.invalid && control.touched;
  }

  formValido() : boolean {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
    if(this.atividade.length == 0) 
      return;

    this.certificado.atividades.push(this.atividade);
    this.atividade = "";
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  submit(){
    if(this.formValido() == false) return;

    this.certificado.dataEmissao = this.dataAtual();
    this.certificado.id = uuidv4();

    this.certificadoService.adicionarCertificado(this.certificado);

    this.route.navigate(['certificados', this.certificado.id]);

    //Não mais necessário pois iremos redirecionar para tela do certificado
    // this.certificado = this.resetFormulario();
    // this.form.resetForm();
  }

  dataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = String(dataAtual.getFullYear());

    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  resetFormulario() : Certificado {
    return {
      id: "",
      nome: "",
      atividades: [],
      dataEmissao: ""
    }
  }
}
