const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({ error: error }) }

        conn.query('SELECT * FROM usuario WHERE email = ?', [req.body.email], (error, results) => {
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length > 0) {
                res.status(409).send({ mensagem: 'Usuário já cadastrada' })
            } else {

                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuario (nome, email, cpf, telefone, senha) VALUES (?,?,?,?,?)`,
                        [req.body.nome, req.body.email, req.body.cpf, req.body.telefone, hash],
                        (error, results) => {
                            conn.release();
                            if (error) { return res.status(500).send({ error: error }) }
                            response = {
                                mensagem: 'Usuário criado com sucesso',
                                usuarioCriado: {
                                    id_usuario: results.insertId,
                                    Nome: req.body.nome,
                                    email: req.body.email,
                                    cpf: req.body.cpf,
                                    telefone: req.body.telefone

                                }
                            }
                            return res.status(201).send(response)
                        })
                });
            }
        })
    });
});

router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usuario WHERE email = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (error)
                 { return res.status(401).send({ mensagem: 'Falha na autenticação' })}
                if(result){
                let token = jwt.sign({
                    id_usuario: results[0].id,
                    Nome: results[0].nome,
                    email: results[0].email,
                    Cpf: results[0].cpf,
                    telefone: results[0].telefone,
                    id_tipo_cargo: results[0].id_tipo_cargo  

                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                  return res.status(200).send({
                      mensagem: 'Autenticado com sucesso',
                      usuario: results,
                      token: token
                     });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            });
            
        });
    });
})

router.post('/login_adm', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        const query = `SELECT * FROM usuario WHERE email = ?`
        conn.query(query, [req.body.email], (error, results, fields) => {
            conn.release();
            if (error) { return res.status(500).send({ error: error }) }
            if (results.length < 1) {
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            if(results[0].id_tipo_cargo != 2){
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (err, result) => {
                if (error)
                 { return res.status(401).send({ mensagem: 'Falha na autenticação' })}
                if(result){
                let token = jwt.sign({
                    id_usuario: results[0].id,
                    Nome: results[0].nome,
                    email: results[0].email,
                    Cpf: results[0].cpf,
                    telefone: results[0].telefone,
                    id_tipo_cargo: results[0].id_tipo_cargo

                }, process.env.JWT_KEY, 
                {
                    expiresIn: "1h"
                });
                  return res.status(200).send({
                      mensagem: 'Autenticado com sucesso',
                      token: token
                     });
                }
                return res.status(401).send({ mensagem: 'Falha na autenticação' })
            });
            
        });
    });
})





module.exports = router;

