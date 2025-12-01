# Gerador de Certificados

Aplicação Angular para gerenciar atividades e gerar certificados personalizados.
O projeto fornece telas para autenticação, cadastro de usuários, criação/edição de certificados e atividades, além de um mecanismo para gerar um certificado visualmente (modelo em `public/certificate`).

## Visão geral

- Framework: Angular (v19)
- UI: Bootstrap 5 + Angular Material
- Geração de imagem do certificado: `html2canvas`
- Deploy configurado para Netlify (`netlify.toml`)

## Funcionalidades principais

- Autenticação de usuário (login / registro)
- Lista e gerenciamento de usuários
- CRUD de certificados (criar, visualizar, editar)
- CRUD de atividades vinculadas aos certificados

## Rotas importantes

- `/login-usuario` — Tela de login
- `/criar-usuario` — Cadastro de novo usuário
- `/usuarios` — Lista de usuários
- `/certificados` — Lista de certificados (protegida)
- `/certificados/novo-certificado` — Criar certificado (protegida)
- `/certificados/:id` — Visualizar certificado (protegida)
- `/atividades` — Lista de atividades (protegida)
- `/atividade/nova-atividade` — Criar atividade (protegida)
- `/atividade/edicao-atividade/:id` — Editar atividade (protegida)

Essas rotas estão definidas em `src/app/app.routes.ts` e algumas exigem autenticação (`AuthGuard`).

## Estrutura resumida do projeto

- `src/` — Código fonte
   - `app/` — Módulos, componentes, páginas, serviços e guards
   - `assets/` / `public/` — Recursos públicos (templates de certificado, navbar etc.)
   - `environments/` — Variáveis de ambiente (produção / desenvolvimento)
- `angular.json` — Configuração de build (inclui `custom-theme.scss`, Bootstrap e ícones)
- `netlify.toml` — Configuração de deploy no Netlify

## Scripts úteis

Usar PowerShell no Windows (ou terminal compatível):

```powershell
npm install
npm start        # executa o servidor de desenvolvimento (configuração: development)
npm run build    # compila para produção (output: dist/gerador-certificado)
npm run watch    # build em modo watch (development)
npm test         # executa testes unitários (Karma/Jasmine)
```

Observações:
- O `start` usa `ng serve` com configuração `development` definida em `angular.json`.
- Para deploy no Netlify, `netlify.toml` está configurado para executar `ng build --configuration=production` e publicar `dist/gerador-certificado/browser`. Verifique se a saída atual do build gerada pelo Angular corresponde a esse caminho; caso contrário, ajuste `netlify.toml` ou `angular.json` conforme necessário.

## Dependências relevantes

- `@angular/*` (v19)
- `@angular/material`, `@angular/cdk`
- `bootstrap` (CSS e bundle JS)
- `html2canvas` (geração de imagem do certificado)
- `uuid` (identificadores)

Versões completas e scripts estão em `package.json`.

## Como rodar localmente (passo a passo)

1. Clone o repositório e abra a pasta do projeto.
2. Instale dependências:

```powershell
npm install
```

3. Rodar em modo desenvolvimento:

```powershell
npm start
# ou explicitamente: ng serve --configuration development
```

4. Acesse `http://localhost:4200`.

5. Para gerar build de produção:

```powershell
npm run build
```

## Boas práticas e notas para desenvolvedores

- Verifique `src/environments/*` para configurar endpoints de API.
- O cliente HTTP é provido com um interceptor (`TokenInterceptor`) para acrescentar token nas requisições.
- Assets do certificado ficam em `public/certificate` e são carregados no build (veja `angular.json` > `assets`).

## Deploy

- O projeto já possui `netlify.toml` para deploy automático no Netlify.
- Comandos comuns para deploy manual:

```powershell
ng build --configuration=production
# depois envie o conteúdo de dist/gerador-certificado para seu provedor
```
