import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';
import { ItemAtividadeComponent } from "../../components/item-atividade/item-atividade.component";
import { AtividadeService } from '../../services/atividade.service';
import { IAtividadeResponse } from '../../interfaces/atividades/atividade-response';
import { FormsModule } from '@angular/forms';
import { normalizeString } from '../../shared/utils/string-utils';

@Component({
  selector: 'app-atividades',
  imports: [
    NavbarComponent,
    BaseUiComponent,
    SecondaryButtonComponent,
    RouterLink,
    ItemAtividadeComponent,
    FormsModule
],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css'
})
export class AtividadesComponent {
  private readonly atividadeService = inject(AtividadeService);

  atividades: IAtividadeResponse[] = [];
  atividadesFiltradas: IAtividadeResponse[] = []; // NOVO ARRAY
  atividade: string = "";

  ngOnInit(): void {
    this.atividadeService.listarAtividades()
      .subscribe({
        next:(response: IAtividadeResponse[]) => {
            this.atividades = response.sort((a, b) => {
             return a.nome.localeCompare(b.nome);
            });
            this.atividadesFiltradas = this.atividades;
        },
        error: (err: any) => {
          console.log(err);
        }
      })
 }

  onAtividadeChange(value: string) {
    this.atividadesFiltradas = this._filter(value);
  }

  // Método privado para fazer a lógica de filtragem
 private _filter(value: string): IAtividadeResponse[] {
  if (!value) return this.atividades;

  const filterValue = normalizeString(value);

  return this.atividades.filter(atividade => normalizeString(atividade.nome).startsWith(filterValue));
 }
}
