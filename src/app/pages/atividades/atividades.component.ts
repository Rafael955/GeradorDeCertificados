import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { SecondaryButtonComponent } from "../../components/secondary-button/secondary-button.component";
import { RouterLink } from '@angular/router';
import { ItemAtividadeComponent } from "../../components/item-atividade/item-atividade.component";
import { AtividadeService } from '../../services/atividade.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-atividades',
  imports: [
    NavbarComponent,
    BaseUiComponent,
    SecondaryButtonComponent,
    RouterLink,
    ItemAtividadeComponent
],
  templateUrl: './atividades.component.html',
  styleUrl: './atividades.component.css'
})
export class AtividadesComponent {

  private readonly atividadeService = inject(AtividadeService);

  atividades: any[] = [];

  ngOnInit(): void {
    this.atividadeService.listarAtividades()
      .pipe(take(1))
      .subscribe((atividades) => this.atividades = atividades);
  }
}
