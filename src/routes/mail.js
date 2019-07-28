const { Router } = require('express');
const router = new Router();
const _ = require('underscore');
var nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');


router.get('/', (req, res) => {
    res.send("mail");

})

router.post('/', (req, res) => {

    var regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const { mensaje, nombre, correo } = req.body;
    if (mensaje && nombre && regex.test(correo)) {
        var transporter = nodemailer.createTransport({
            host: 'mail.lucianogonzalez.cl',
            port: '465',
            auth: {
                user: 'contacto@lucianogonzalez.cl',
                pass: 'contacto_123'
            }
        });

        var mailOptions = {
            from: correo,
            to: 'contacto@lucianogonzalez.cl',
            subject: 'Mensaje desde la página web',
            text: `${mensaje}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.status(500).json(
                    {
                        error: 'error al enviar el correo de ' + mailOptions.from + ' detalle : ' + error
                    }
                );
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('success');
            }
        });

    } else {
        res.status(500).json(
            {
                error: 'Eror al procesar los siguientes datos, mensaje:' + mensaje + ',nombre: ' + nombre + ', correo: ' + correo
            }
        );
    }
});


module.exports = router;