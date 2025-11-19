import { IAtividadeRequest } from "../atividades/atividade-request";

export interface ICertificadoRequest {
    nome: string;
    atividades: IAtividadeRequest[];
    usuarioId: string;
}