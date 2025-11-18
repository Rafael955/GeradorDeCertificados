import { Component, Input } from '@angular/core';
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-item-atividade',
  imports: [
    
  ],
  templateUrl: './item-atividade.component.html',
  styleUrl: './item-atividade.component.css'
})
export class ItemAtividadeComponent {

  @Input() nomeAtividade: string = '';
  @Input() id: string = '';

  constructor(private router: Router) {}


  editarAtividade() {
    this.router.navigate(['atividade/edicao-atividade/', this.id]);
  }
}
