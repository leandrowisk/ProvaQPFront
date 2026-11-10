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
- Autenticação via JWT
- Proteção de páginas autenticadas
- Redirecionamento para login quando a sessão expira
- Cadastro de pessoas
- Listagem de pessoas
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

Clone o repositório
Acesse a pasta raiz
Instale as dependências com npm install
Utilize a porta 3000 para não obter erros de CORS local
Para subir o projeto localmente utilize: npm run dev -- -p 3000
Acesse:
http://localhost:3000

Frontend com fluxo de autenticação JWT, listagem e cadastro de pessoas e pesquisa de nacionalidade com base no nome.
