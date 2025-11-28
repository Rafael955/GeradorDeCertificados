import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PrimaryButtonComponent } from "../primary-button/primary-button.component";
import { SecondaryButtonComponent } from "../secondary-button/secondary-button.component";
import { CertificadoService } from '../../services/certificado.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-item-usuario',
  imports: [
    SecondaryButtonComponent
],
  templateUrl: './item-usuario.component.html',
  styleUrl: './item-usuario.component.css'
})
export class ItemUsuarioComponent {
  @Input() nomeUsuario: string = '';
  @Input() emailUsuario: string = '';
  @Input() perfilUsuario: string = '';
  @Input() idUsuario: string = '';

  usuarioService = inject(UsuarioService);
onDelete() {
  this.usuarioService.excluirUsuario(this.idUsuario)
    .subscribe({
      next: () => {
        alert(`A conta do usuário ${this.nomeUsuario} foi excluída com sucesso!`);
      },
      error: (error) => {
        console.log(error);
        alert('Houve um erro ao excluir o usuário.');
      }
    });
}

}
