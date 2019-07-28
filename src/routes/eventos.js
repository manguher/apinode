const { Router } = require('express');
var jsonfile = require('jsonfile');
const _ = require('underscore');
const router = Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:admindb_weblg@cluster0-rzabg.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
var ObjectID = require('mongodb').ObjectID;


router.get('/', (req, res) => {

    MongoClient.connect(uri, function (err, db) {
        if (err) res.status(500).send(err);
        var dbo = db.db("dbweblg");
        var today = new Date().toLocaleDateString('es-CL', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        dbo.collection("eventos").find({ "fecha": { $gte: new Date(today) } })
            .toArray(function (err, result) {
                if (err) res.status(500).send(err);
                res.send(result)
                db.close();
            });
    });
});

router.put('/:id', (req, res) => {

    const { id } = req.params;
    const { title, fecha, direccion, description } = req.body;

    if (id && title && fecha && direccion) {
        MongoClient.connect(uri, function (err, db) {

            if (err) res.status(500).send('error de base de datos: ' + err);
            var dbo = db.db("dbweblg");

            dbo.collection("eventos").updateOne(
                { "_id": ObjectID(id) },
                {
                    $set:
                    {
                        "title": title,
                        "fecha": fecha,
                        "direccion": direccion,
                        "description": description
                    }
                },
                function (err, result) {
                    if (err) res.status(500).send("error al actualizar los datos : " + err);
                    res.status(200).send('evento editado correctamente')
                    db.close();
                }
            )
        });
    }
});
module.exports = router;