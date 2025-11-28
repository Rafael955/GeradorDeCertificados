import { Component, inject } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { BaseUiComponent } from "../../components/base-ui/base-ui.component";
import { ItemUsuarioComponent } from "../../components/item-usuario/item-usuario.component";
import { UsuarioService } from '../../services/usuario.service';
import { IUsuarioResponseDto } from '../../interfaces/usuarios/usuario-response';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  imports: [NavbarComponent, BaseUiComponent, ItemUsuarioComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  private subs = new Subscription();

  usuarios: IUsuarioResponseDto[] = [];
  usuarioService = inject(UsuarioService);

  ngOnInit(): void {
    this.loadUsers();

    // quando um usuário for excluído, recarregamos a lista
    this.subs.add(
      this.usuarioService.userDeleted$.subscribe(id => {
        // opcional: remover localmente para reduzir requests
        this.usuarios = this.usuarios.filter(u => u.id !== id);
      })
    );
  }

  loadUsers() {
    this.usuarioService.listarUsuarios()
      .subscribe({
        next: (response: IUsuarioResponseDto[]) => {
          const data = sessionStorage.getItem('dadosUsuario');
          const _usuario = JSON.parse(data as string);

          this.usuarios = response.filter(usuario => usuario.id != _usuario.id);
        },
        error: (error) => {
          console.log(error);
        }
      });
  }
}
