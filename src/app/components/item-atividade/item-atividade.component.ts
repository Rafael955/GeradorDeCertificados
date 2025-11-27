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
  isAdmin: boolean = false;

  @Input() nomeAtividade: string = '';
  @Input() id: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const data = sessionStorage.getItem('dadosUsuario');
    const usuario = JSON.parse(data as string);
    this.isAdmin = usuario.perfil === 'Administrador';
  }

  editarAtividade() {
    if(this.isAdmin)
      this.router.navigate(['atividade/edicao-atividade/', this.id]);
  }
}
