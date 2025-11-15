export interface IAutenticarUsuarioResponse {
    Id: string;
    NomeUsuario: string;
    Email: string;
    Perfil: string;
    DataHoraAcesso: Date;
    Token: string;
}