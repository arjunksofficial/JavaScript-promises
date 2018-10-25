var fs = require('fs');
var mysqlservices = require('../services/mysqlservices');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json();
module.exports = function (app) {

    app.get('/', function (req, res) {
        fs.readFile('./public/html/index.html', 'utf8', function (err, contents) {
            res.send(contents);
        });
    });

    app.get('/person', function (req, res) {
        mysqlservices.getPerson().then(function (result) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result);
        });
    });

    app.get('/person/:id', function (req, res) {

        mysqlservices.getPersonById(req.params.id).then(function (result) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(result);
        });
    });
    app.post('/person', jsonParser, function (req, res) {
        var obj = {};
        obj.name = req.body.name;
        obj.email = req.body.email;
        obj.password = req.body.password;
        mysqlservices.insertPerson(obj)
            .then(function (id) {
                mysqlservices.getPersonById(id).then(function (result) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                });
            }).catch(function (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(error);
            });
    });

    app.patch('/person', jsonParser, function (req, res) {
        var obj = {};
        obj.id = req.body.id;
        if (req.body.name !== undefined){
            obj.name = req.body.name;
        }
        if (req.body.email !== undefined){
            obj.email = req.body.email;
        }
        if (req.body.password !== undefined){
            obj.password = req.body.password;
        }
        mysqlservices.updatePerson(obj)
            .then(function (id) {
                mysqlservices.getPersonById(id).then(function (result) {
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(result);
                });
            }).catch(function (error) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(error);
            });
    });
}