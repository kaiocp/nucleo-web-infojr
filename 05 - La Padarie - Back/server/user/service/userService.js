const mysql = require('../../database').pool;

exports.getAllUsers = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            "SELECT * FROM user",
            (error, response) => {
                if (error) {
                    conn.release();

                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: "Exibindo todos usuários",
                    response: response
                })
            }
        )
    })
}

exports.getUserById = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM user WHERE id = ?', [req.params.id],
            (error, response) => {
                if (error) {
                    conn.release();

                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: "Exibindo infos do usuário",
                    response: response
                })
            }
        )
    })
}

exports.createUser = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO user (name, breads) VALUES (?, ?)', [req.body.name, req.body.breads],
            (error) => {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error
                    })
                }

                res.status(201).send({
                    mensagem: 'Usuario criado com sucesso'
                })
            }
        )
    })
}

exports.deleteUser = (req, res) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'DELETE FROM user WHERE id = ?', [req.params.id],
            (error) => {
                if (error) {
                    conn.release();

                    return res.status(500).send({ error: error })
                }
                res.status(200).send({
                    message: "Usuario removido com sucesso"
                })
            }
        )
    })
}