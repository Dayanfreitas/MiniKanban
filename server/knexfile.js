module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename:  './src/database/db.sqlite'
    },
    useNullAsDefault: true,
    migrations :{
      directory:  './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },   
  },

  test: {
    client: "sqlite3",
    connection: "./__tests__/db.test",
    useNullAsDefault: true,
    migrations :{
      directory:  './src/database/migrations'
    },
    seeds: {
      directory: './src/database/seeds'
    },   
  },

}