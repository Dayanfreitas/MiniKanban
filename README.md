## Front end: app
O Front-End e apenas um conteúdo estático 

Tecnologias ultilizadas:
- HTML
- CSS
- JavaScript 
- CDN do axios:  
    Para poder fazer a integração com back end
    
### Subir aplicação 
1 - Pode abrir o index.html normalmente no navegador

## Back end: server
O Back-End e desenvolvido e node ultilizando algumas bibliotecas:
 - Express    
 Criação de rotas 
 - Celebrate  
 Middleware para facilitar as validações das request
 - Knex   
 SQL query builder para facilitar as consultas e mapeamento relacional
 - Sqlite3  
 Para armezenamento de dados

## Como rodar

- Realizar o downlod do Node
- Rodar `npm install` e `npm start`

## Cria tabelas
- `npx knex migrate:up`

## Colocar os dados em base
- `npx knex seed:run`