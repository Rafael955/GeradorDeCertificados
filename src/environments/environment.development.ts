const certificadosApiUrl = 'http://localhost:5279/api';

export const config = {
    production: false,
    certificadosApi_certificados: `${certificadosApiUrl}/certificados`,
    certificadosApi_atividades: `${certificadosApiUrl}/atividades`,
    certificadosApi_usuarios: `${certificadosApiUrl}/usuarios`
}