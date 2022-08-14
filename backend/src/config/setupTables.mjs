import dbConnection from '../config/database.mjs';

const setupTables = async() => {
  return ( await dbConnection.query( 
      `
      DROP TABLE IF EXISTS tasks;
      DROP TABLE IF EXISTS projects;
      DROP TABLE IF EXISTS users;
      
      CREATE TABLE users (
        id serial not null primary key,
        full_name varchar(50) not null,
        email varchar(50) not null,
        password varchar(100) not null,
        created_at timestamp default current_date,
        updated_at timestamp default current_date
      );
      
      CREATE TABLE projects (
        id serial not null primary key,
        name varchar(50) not null,
        created_at timestamp default current_date,
        updated_at timestamp default current_date,
        user_id integer not null,

        constraint fkuserid foreign key (user_id) references users(id)
      );
      
      CREATE TABLE tasks (
        id serial not null primary key,
        title varchar(200) not null,
        created_at timestamp default current_date,
        updated_at timestamp default current_date,
        finished_at timestamp,
        status varchar(4),
        project_id integer not null,

        constraint fkprojectid foreign key (project_id) references projects(id)
      );`
  ));
}

try{
  await setupTables()
  console.log('tabelas geradas com sucesso. Warning: executar este comando novamente vai DROPar as tabelas e cria-las novamente.')
} catch(err){
  console.log(`ocorreu um erro ao criar as tabelas no banco de dados: ${err}`)
}

process.exit()