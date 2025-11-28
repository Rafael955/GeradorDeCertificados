import { Component, inject, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PrimaryButtonComponent } from "../../components/primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { FormsModule, NgForm, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Certificado } from '../../interfaces/certificados/certificado';
import { CertificadoService } from '../../services/certificado.service';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { ICertificadoRequest } from '../../interfaces/certificados/certificado-request';
import { take } from 'rxjs';
import { ICertificadoResponse } from '../../interfaces/certificados/certificado-response';
import { MatAutocomplete, MatOption, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { AtividadeService } from '../../services/atividade.service';
import { IAtividadeResponse } from '../../interfaces/atividades/atividade-response';
import { IAtividadeRequest } from '../../interfaces/atividades/atividade-request';
import { normalizeString } from '../../shared/utils/string-utils';

@Component({
  selector: 'app-certificado-form',
  imports: [
    SecondaryButtonComponent,
    PrimaryButtonComponent,
    FormsModule,
    CommonModule,
    NavbarComponent,
    BaseUiComponent,
    MatAutocomplete,
    MatOption,
    MatAutocompleteTrigger,
    ReactiveFormsModule,
    RouterLink
],
  templateUrl: './certificado-form.component.html',
  styleUrl: './certificado-form.component.css'
})
export class CertificadoFormComponent {
  @ViewChild('form') form! : NgForm
  @ViewChildren('opt') options!: QueryList<MatOption>;

  atividades: IAtividadeResponse[] = [];
  atividadesFiltradas: IAtividadeResponse[] = [];
  atividade: string = "";

  private readonly atividadeService = inject(AtividadeService);

  constructor(
    private certificadoService: CertificadoService,
    private route: Router) {}

  ngOnInit(): void {
    this.atividadeService.listarAtividades()
      .subscribe({
        next:(response: IAtividadeResponse[]) => {
          this.atividades = response.sort((a, b) => {
            return a.nome.localeCompare(b.nome);
          });

          this.atividadesFiltradas = response.sort((a, b) => {
            return a.nome.localeCompare(b.nome);
          });
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  certificado: ICertificadoRequest = {
    nome: "",
    atividades: [],
    usuarioId: "",
  }

  campoInvalido(control: NgModel){
    return control.invalid && control.touched;
  }

  formValido() : boolean {
    return this.certificado.atividades.length > 0 && this.certificado.nome.length > 0;
  }

  adicionarAtividade() {
    if(this.atividade.length == 0)
      return;

    const atividadeAdicionada: IAtividadeRequest = {
      nome: this.atividade
    }

    if(this.certificado.atividades.some(atividade => atividade.nome == atividadeAdicionada.nome)) {
      alert("Atividade já adicionada");
      return;
    }

    this.certificado.atividades.push(atividadeAdicionada);
    this.atividade = "";
  }

  excluirAtividade(index: number) {
    this.certificado.atividades.splice(index, 1);
  }

  onSubmit(){
    if(this.formValido() == false) return;

    const data = sessionStorage.getItem('dadosUsuario');
    const usuario = JSON.parse(data as string);

    this.certificado.usuarioId = usuario.id as string;

    const certificadoNovo: ICertificadoRequest = {
      nome: this.certificado.nome,
      atividades: this.certificado.atividades,
      usuarioId: this.certificado.usuarioId
    }

    this.certificadoService.criarCertificado(certificadoNovo)
      .pipe(take(1))
        .subscribe({
          next: (response: ICertificadoResponse) => {
            this.route.navigate(['certificados', response.id]);
          },
          error: (error) => {
            console.log(error);
          }
        });
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

  private _filter(value: string): IAtividadeResponse[] {
    if (!value) return this.atividades; // Se o valor for vazio, retorna todas

    const filterValue = normalizeString(value);

    return this.atividades.filter(atividade =>
      normalizeString(atividade.nome).startsWith(filterValue)
    );
  }

  // Novo método para ser chamado quando o input muda
  onAtividadeChange(value: string) {
    this.atividadesFiltradas = this._filter(value);
  }

  onAutocompleteOpened() {
    // Quando o autocomplete abrir, remove a seleção visual em todas as opções
    this.options?.forEach(opt => {
      try {
        opt.deselect();
      } catch (e) {
        // se não for possível desselecionar, ignore silenciosamente
      }
    });

    this.atividadesFiltradas = this._filter(this.atividade);
  }
}
