const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middleware/login_mid');



router.get('/', (req, res, next) => {
    console.log(req.usuario)
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM questoes;',
            (error, result, field) => {
                conn.release(); //talvez erro
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    tamanho: result.length,
                    produtos: result.map(qts => {
                        return {
                            questao:{
                                id_questao: qts.id,
                                id_materia: qts.id_Materia,
                                id_corprova: qts.id_CorProva,
                                id_anoprova: qts.id_AnoProva,
                                id_instituicao: qts.id_instituicao,
                                textoprincipal: qts.textoprincipal,
                                textoquestao: qts.textoquestao,
                                img_top: qts.Img_Top,
                                img_central: qts.Img_Central,
                                img_final: qts.Img_Final,
                                alternativa_A: qts.alternativa_A,
                                alternativa_B: qts.alternativa_B,
                                alternativa_C: qts.alternativa_C,
                                alternativa_D: qts.alternativa_D,
                                alternativa_E: qts.alternativa_E,
                                Gabarito: qts.gabarito
                            },
                            Request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de uma questao específico',
                                url: 'http://localhost:3000/questoes/' + qts.id

                            }
                        }

                    })
                }
                return res.status(200).send(response)
            }
        )
    });
});

router.get('/:id_questao',login.obrigatorio, (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM questoes WHERE  id = ?;',
            [req.params.id_questao],
            (error, result, field) => {
                if (error) { return res.status(500).send({ error: error }) }

                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado questoes com esse ID'
                    })
                }
                const response = {

                    questao: {
                        id_questao: result[0].id,
                        id_materia: result[0].id_Materia,
                        id_corprova: result[0].id_CorProva,
                        id_anoprova: result[0].id_AnoProva,
                        id_instituicao: result[0].id_instituicao,
                        textoprincipal: result[0].textoprincipal,
                        textoquestao: result[0].textoquestao,
                        img_top: result[0].Img_Top,
                        img_central: result[0].Img_Central,
                        img_final: result[0].Img_Final,
                        alternativa_A: result[0].alternativa_A,
                        alternativa_B: result[0].alternativa_B,
                        alternativa_C: result[0].alternativa_C,
                        alternativa_D: result[0].alternativa_D,
                        alternativa_E: result[0].alternativa_E,
                        Gabarito: result[0].gabarito,
                        Request: {
                            tipo: 'GET',
                            descricao: 'Retorna os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response)
            }
        )
    });

});

router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'INSERT INTO questoes (numero_questao, id_materia, id_CorProva, id_AnoProva, id_instituicao, textoprincipal, textoquestao, alternativa_A, alternativa_B, alternativa_C, alternativa_D, alternativa_E, gabarito) VALUES (?,?,?,?,)',
            [
                req.body.nome,
                req.body.preco,
                req.file.path
            ],
            (error, result, field) => {
                conn.release();

                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    produtoCriado: {
                        id_produto: result.id_produtos,
                        nome: req.body.nome,
                        preco: req.body.preco,
                        imagem_produto: req.body.imagem_produto,
                        Request: {
                            tipo: 'GET',
                            descricao: 'Retorna os produtos',
                            url: 'http://localhost:3000/produtos'
                        }
                    }
                }
                return res.status(201).send(response)
            }
        )
    });
});


module.exports = router;