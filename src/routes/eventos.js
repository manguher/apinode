const { Router } = require('express');
const _ = require('underscore');
var mysql = require('mysql');
const router = Router();


var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'lucianog_bdweb'
});

router.get('/', (req, res) => {

    var query = connection.query(
        'SELECT * FROM eventos where DATE(evento_fecha) >= DATE(NOW())', function (error, result) {
            if (error) {
                res.send(error);
            } else {
                res.send(result);
            }
        }
    );
});

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const { title, fecha, hora, direccion, description } = req.body;

    // update eventos
    let sql = `UPDATE eventos
    SET evento_titulo = ?,
    evento_fecha = ?,
    evento_hora = ?,
    evento_direccion = ?,
    evento_descripcion = ?
    WHERE evento_id = ?`;

    let data = [];
    data.push(title)
    data.push(fecha)
    data.push(hora)
    data.push(direccion)
    data.push(description)
    data.push(id)

    if (id && title && fecha && hora && direccion) {
        connection.query(sql, data, (error, results, fields) => {
            if (error) {
                return console.error(error.message);
            }
            console.log('Rows affected:', results.affectedRows);
        });
    }
    else {
        res.send("debe completar los campos requeridos");
    }
});

router.post('/addevento', (req, res) => {

    const { title, fecha, hora, direccion, description } = req.body;
    if (title && fecha && hora && direccion) {
        MongoClient.connect(uri, function (err, db) {

            if (err) res.status(500).send('error de base de datos: ' + err);
            var dbo = db.db("dbweblg");

            dbo.collection("eventos").insertOne(
                {
                    "title": title,
                    "fecha": new Date(fecha),
                    "hora": hora,
                    "direccion": direccion,
                    "description": description
                },
                function (err, result) {
                    if (err) res.status(500).send("error al insertar evento: " + err);
                    res.status(200).send('evento guardado correctamente')
                    db.close();
                })
        });
    }
    else {
        res.status(500).send('debe completar campos' + err);
    }
});
module.exports = router;