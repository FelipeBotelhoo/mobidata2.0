const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mobidata'
};

// Rota com tratamento melhorado para resultados vazios
app.get('/users', async (req, res) => {
  try {
    const { search } = req.query;
    const connection = await mysql.createConnection(dbConfig);
    
    let query = 'SELECT * FROM usuarios';
    const params = [];
    
    if (search) {
      query += ' WHERE nome LIKE ? OR email LIKE ?';
      params.push(`%${search}%`, `%${search}%`);
    }
    
    query += ' ORDER BY situacao ASC, nome ASC';
    
    const [rows] = await connection.query(query, params);
    await connection.end();

    res.json({
      success: true,
      users: rows,
      ...(rows.length === 0 && { message: 'Nenhum usuário encontrado' })
    });
    
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Erro no servidor',
      details: error.message 
    });
  }
});



app.listen(5000, () => console.log('Servidor rodando na porta 5000'));