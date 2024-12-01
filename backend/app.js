const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'elegance',
});

app.use(cors());
app.use(bodyParser.json());

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  console.log('Cadastro solicitado:', name, email, password);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, password], (err) => {
    if (err) {
      console.error('Erro ao cadastrar:', err);
      return res.status(500).json({ error: 'Erro no cadastro' });
    }
    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err || result.length === 0)
      return res.status(401).json({ error: 'Credenciais inválidas' });
    res.json({ message: 'Login bem-sucedido' });
  });
});

app.get('/products', (req, res) => {
  const query = 'SELECT * FROM products';
  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar produtos' });
    res.json(result);
  });
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
