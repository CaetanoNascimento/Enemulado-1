const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.post('/', (req, res, next) => {
    console.log("body")
    console.log(req.body)
    console.log("possivel soluçao: passar tudo por params, mas vai ser feio e trabalhoso")
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO simulados (id_tipo_simulado, id_usuario, data_inicio, data_final, duracao, nota_geral, status) VALUES (?,?,?,?,?,?,?)',
            [
                a = parseInt(req.body.id_tipo_simulado),
                b = parseInt(req.body.id_usuario),
                g = new String(req.body.data_inicio),
                f = new String(req.body.data_final),
                e =  String(req.body.duracao),
                c = parseInt(req.body.nota_geral),
                d = parseInt(req.body.status)
            ],
            console.log("a, b, c"),
            console.log(a, b, c, d, e, f, g),
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

router.patch('/final/', (req, res, next) => {
    console.log("body")
    console.log(body)
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            `UPDATE simulados
               SET nota_geral = ?,
                   data_final = ?,
                   status = ?
             WHERE id = ?`,
            [
                req.body.nota_geral,
                req.body.data_final,
                req.body.status,
                req.body.data_final,
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