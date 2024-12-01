const db = require('./database');

function checkConnection() {
  db.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }

    console.log('Conexão bem-sucedida com o banco de dados!');
    connection.release();
  });
}

checkConnection();