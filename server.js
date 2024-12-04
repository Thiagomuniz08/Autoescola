const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const con = mysql.createConnection({
    user: 'root', 
    host: 'localhost',
    database: 'Autoescola'
});

// Conectar ao banco de dados
con.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Rota de teste
const teste = (req, res) => {
    res.send("Back-end respondendo");
}

// CRUD - Create
const create = (req, res) => {
    const { nome, email, telefone, categoria_cnh } = req.body; 
    
    const query = 'INSERT INTO instrutores (nome, email, telefone, categoria_cnh) VALUES (?, ?, ?, ?)';
    con.query(query, [nome, email, telefone, categoria_cnh], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Instrutor criado com sucesso', result });
        }
    });
}

// CRUD - Read
const read = (req, res) => {
    con.query("SELECT * FROM instrutores", (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(result);
        }
    });
}

// CRUD - Update
const update = (req, res) => {
    const { id, nome, email, telefone, categoria_chh, data_cadastro } = req.body;

    const query = 'UPDATE instrutoes SET Nome = ?, Email = ?, Telefone = ?, categoria_chh = ? data_cadastro = ? WHERE ClienteID = ?';
    con.query(query, [nome, email, telefone,categoria_chh, data_cadastro, id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Instrutor atualizado com sucesso', result });
        }
    });
}

// CRUD - Delete
const deleteClient = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM instrutores WHERE ClienteID = ?';
    con.query(query, [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ message: 'Instrutor removido com sucesso', result });
        }
    });
}

// Configurações de saída - FrontEnd
const app = express();
app.use(express.json());
app.use(cors());

// Rotas de Saída - FrontEnd
app.get("/", teste);
app.post("/instrutores", create); 
app.get("/instrutores", read);


// Teste e porta no console
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});