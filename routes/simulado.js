const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO simulados (id_tipo_simulado, id_usuario, data_inicio, data_final, duracao, nota_geral, status) VALUES (?,?,?,?,?,?,?)',
            [
                req.body.id_tipo_simulado,
                req.body.id_usuario,
                req.body.data_inicio,
                req.body.data_final,
                req.body.duracao,
                req.body.nota_geral,
                req.body.status
            ],
            // console.log(req.body),

            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Simulado inserido com sucesso',
                    id_simulado: result.insertId

                }

                return res.status(201).send(response)
            }
        )
    });
});

router.post('/questao/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO simulado_questao (id_simulado, id_questoes, resposta_usuario, status) VALUES (?,?,?,?)',
            [
                req.body.id_simulado,
                req.body.id_questoes,
                req.body.resposta_usuario,
                req.body.status
            ],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Simulado_questao inserido com sucesso'
                }

                return res.status(201).send(response)
            }
        )
    });
});

router.get('/:id_usuario/:id_tipo_simulado', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT  id, id_tipo_simulado, duracao, nota_geral FROM simulados
            WHERE STATUS = 1 AND id_usuario = ? AND id_tipo_simulado = ?
            ORDER BY id  LIMIT 8;`,
            [req.params.id_usuario, req.params.id_tipo_simulado],
            
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    simulados_prontos: result.map(qts => {
                        return {
                            simulado: qts
                        }

                    }),


                }
                return res.status(201).send(response)
            }
        )
    });

});

router.get('/final/:id_simulado', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT * FROM simulados
             WHERE    id = ?;`,
            [req.params.id_simulado],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {

                    data_inicio: result[0].data_inicio

                }
                return res.status(201).send(response)
            }
        )
    });

});

router.patch('/final/', (req, res, next) => {
    console.log(req.body)
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE simulados
               SET nota_geral = ?,
                   data_final = ?,
                   duracao = ?,
                   status = ?
             WHERE id = ?`,
            [
                req.body.nota_geral,
                req.body.data_final,
                req.body.duracao,
                req.body.status,
                req.body.id_simulado
            ],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Simulado finalizado com sucesso',
                }

                return res.status(201).send(response)
            }
        )
    });
});

module.exports = router;