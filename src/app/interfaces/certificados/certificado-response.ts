import { IAtividadeResponse } from "../atividades/atividade-response";

export interface ICertificadoResponse {
    id: string;
    nome: string;
    atividades: IAtividadeResponse[];
    dataEmissao: Date;
    usuarioQueGerou: string;
}