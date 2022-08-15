# Bolttech Challenge

## Libs
- Postgres para o banco de dados
- Express para criação da API REST
- Celebrate (express middleware) para validação dos inputs do usuário
- Bcrypt para encrirptação de senhas
- JsonWebToken para criação das sessões do usuário

## Setup
Para começar, você precisa criar um banco de dados postgres na sua máquina/servidor e criar um arquivo .env na raiz do projeto. Acompanhe o arquivo .env.example para os valores necessários a conexão com o banco de dados e demais variáveis. Você precisa já criar um banco de dados manualmente.

Após preencher as variáveis, rode o seguinte comando no seu terminal:

```
  npm run setup:database
```

Esse comando vai criar as tabelas necessárias para o funcionamento do backend. Caso a operação seja bem sucedida, uma mensagem aparecerá no terminal.

## Run
Para rodar o servidor, use o comando:

```
npm run start
```

Novamente o terminal deve exibir uma mensagem de funcionamento.

### melhorias
- ao deletar algum projeto ou tarefa, certificar que o usuário que está solicitando
a deleção é de fato o dono daquele artefato.