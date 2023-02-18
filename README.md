# Boas vindas ao repositório do projeto!


### É uma aplicação feita por mim, onde realizo um CRUD para realizar autenticação de usuário e realização de abertura de chamados.
### Nela, conseguimos efetuar cadastro de usuários e chamados, login do usuário com autenticação do token JWT, atualizar e deletar.
### Utilizei a biblioteca bcrypt para a realização de criptografia das senhas criadas pelos usuários.

## Funcionamento da aplicação
⚠ **Atenção:** ⚠
Para rodar a aplicação é necessário realizar a configuração do `TYPEORM` e definir as variáveis de ambiente no arquivo `.env`, na raiz do projeto.
Logo em seguida executar um dos comandos abaixo em ordem.

Para instalar as dependências:
```sh
npm install
```
Para baixar a imagem do banco via Docker:
```sh
npm run docker:up
```
Para rodar as migrations e conectar com o banco:
```sh
npm run db:init
```
Para rodar a aplicação:
```sh
npm run start:dev
```

## Alguns campos no modelo principal são:

+ Name 
+ Email
+ Password
+ Role
  
Além disso, podendo ter um usuário com esses campos:

+ name
+ email
+ password
+ role
+ createdAt
+ updatedAt

Podendo conseguir realizar a abertura de chamados com esses campos:

+ title
+ comment
+ status
+ priority
+ createdAt
+ updatedAt


## Tecnologia usadas:

<table>
  <tr>
    <td>Nodejs</td>
    <td>TypeScript</td>
    <td>Postgres</td>
    <td>TypeORM</td>
  </tr>
</table>

# Requisitos desenvolvidos no projeto:

- ✅ 1. Com o endpoint POST `/auth`: É capaz de adicionar um novo user a sua tabela no banco de dados, gerando um token de autenticação.
- ✅ 2  Com o endpoint POST `/call`: É capaz de adicionar um novo chamado a sua tabela no banco de dados.
- ✅ 3. Para cadastrar um novo usuário, terá que preencher os campos "name", "email", "password" e "role".
- ✅ 4. O usuário só poderá colocar no campo "role" as opções "admin" e "user", sendo possível a existência de dois tipos de usuários.
- ✅ 5. Não será permitido o cadastro de um usuário com o mesmo e-mail ou algum dos campos vazios.
- ✅ 6. Para cadastrar uma abertura de chamado, será necessário preencher os campos "title", "comment", "status" e "priority".
- ✅ 7. Usuários que não sejam do tipo "admin" não será capaz de atualizar, deletar, ou listar um chamado, apenas cadastrar.
- ✅ 8. A aplicação possue os métodos get, put e delete para assim, efetuar listagem, atualização ou exclusão de usuários ou chamados.
- ✅ 9  Apenas usuários com um token válido, podem realizar um cadastro de um chamado.
