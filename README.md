# Sistema de Gerenciamento — Frontend

Aplicação web desenvolvida com **Next.js, React e TypeScript**, integrada a uma API REST em Spring Boot.

O sistema possui autenticação JWT e funcionalidades de gerenciamento de pessoas.

## Tecnologias utilizadas

- Next.js
- React
- TypeScript
- Tailwind CSS
- API REST com Spring Boot
- Autenticação JWT

## Funcionalidades

- Login com e-mail e senha
- <img width="1861" height="867" alt="image" src="https://github.com/user-attachments/assets/6ea2a707-d5b3-49a1-aa27-eef5639fcc1c" />
- Autenticação via JWT
- Proteção de páginas autenticadas
- Redirecionamento para login quando a sessão expira
  <img width="1406" height="822" alt="image" src="https://github.com/user-attachments/assets/8d7c8418-557d-43e6-9bc6-f0622e1868e4" />

- Cadastro de pessoas
- <img width="1751" height="832" alt="image" src="https://github.com/user-attachments/assets/61a4a62f-d766-464a-8d2b-21a37e2ef740" />

- Listagem de pessoas
- <img width="1643" height="791" alt="image" src="https://github.com/user-attachments/assets/7b76aa05-8956-4795-81e6-b808f241c90e" />
- Busca por nacionalidade
<img width="1310" height="810" alt="image" src="https://github.com/user-attachments/assets/4493c32c-157c-4954-8012-99ed347dfd55" />

- Mensagens de sucesso e erro
- Comunicação com a API REST

## Pré-requisitos

Antes de executar, tenha instalado:

- Node.js compatível com a versão do Next.js utilizada
- npm
- Git
- Backend Spring Boot configurado e em execução
- O email e senha do usuário permitido são: admin@admin.com e 12345, somente ele conseguirá logar.

## Instalação

- Clone o repositório
- Acesse a pasta raiz
- Instale as dependências com npm install
- Utilize a porta 3000 para não obter erros de CORS local, Para subir o projeto localmente utilize: npm run dev -- -p 3000
- Acesse: http://localhost:3000
- Credenciais de acesso: admin@admin.com e 12345

Frontend com fluxo de autenticação JWT, listagem e cadastro de pessoas e pesquisa de nacionalidade com base no nome.
