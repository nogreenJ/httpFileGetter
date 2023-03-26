'use strict'  
const express = require('express')  
const app = express()
var http = require('http');
var fs = require('fs');
const homeDir = './sharedFiles/'
var sharedDir = homeDir
var $ = require( "jquery" );
var bodyParser = require('body-parser')

app.use(express.static('public'))
const jsonParser = bodyParser.json();

app.get('/', function (req, res) {
    sharedDir = homeDir;
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readdir(sharedDir, (err, paths) => { 

        res.write(`<div ondrop="addFile(event)" ondragover="dragFile(event)">`);

        paths.forEach(path => {
            var holdPath = sharedDir + "/" + path;
            if(fs.lstatSync(holdPath).isDirectory()){
                res.write(`<a href='/dir?path=` + holdPath + `'>/` + path + `</a>
                <button style='display: none;' class='removeBtns' onclick='deleteCall("dir","` + path + `")' type="button">-</button><br/>`);
            } else {
                res.write(`<a href='/file?path=`  + holdPath + `'>` + path + `</a>
                <button style='display: none;' class='removeBtns' onclick='deleteCall("file","` + holdPath + `")' type="button">-</button><br/>`);
            }
        });
        
        res.write(`</div>`);

        res.write(`<div id='textbox' style='display: none;'>
                <input id='dirName' type='text'></input>
                <button id='postBtn' onclick='postBox()' type="button">+</button>
                <button id='hideBtn' onclick='hideAddBox()' type="button">-</button>
            </div>`);
        res.write(`<button type="button" onclick='showAddBox()' id='showBtn'>+</button><br/>`);
        res.write(`<script type="text/javascript" src="/page.js"></script>`);
        res.write(`<script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>`);

        return res.end();
    });
})

app.all('/dir', function getDivContent(req, res){

    if(req.method === 'POST') {
        const dirName = req.query.dirName;
        if (!fs.existsSync(sharedDir + '/' + dirName)){
            fs.mkdirSync(sharedDir + '/' + dirName);
            res.status(201).json({stat: 'success', msg: 'Diretório criado'});
        } else {
            res.status(200).json({stat: 'warn', msg: 'Diretório já existente'});
        }
        return res.end();
    } else if(req.method === 'DELETE') {
        const dirName = req.query.path;
        if (fs.existsSync(sharedDir + '/' + dirName)){
            fs.rmSync(sharedDir + '/' + dirName, { recursive: true, force: true });
            res.status(200).json({stat: 'success', msg: 'Diretório excluido'});
        } else {
            res.status(200).json({stat: 'warn', msg: 'Diretório não existente'});
        }
        return res.end();
    } else if(req.method === 'GET')  {
        sharedDir = req.query.path;
        res.writeHead(200, {'Content-Type': 'text/html'});
        fs.readdir(sharedDir, (err, paths) => { 
            const befDir = sharedDir.substr(0, sharedDir.lastIndexOf("/"));
            
            res.write(`<div ondrop="addFile(event)" ondragover="dragFile(event)">`);
    
            if(sharedDir != homeDir)
                res.write(`<a href='/dir?path=` + befDir + `'>/.</a><br/>`);
    
            paths.forEach(path => {
                var holdPath = sharedDir + "/" + path;
                if(fs.lstatSync(holdPath).isDirectory()){
                    res.write(`<a href='/dir?path=` + holdPath + `'>/` + path + `</a>
                    <button style='display: none;' class='removeBtns' onclick='deleteCall("dir","` + path + `")' type="button">-</button><br/>`);
                } else {
                    res.write(`<a href='/file?path=`  + holdPath + `'>` + path + `</a>
                    <button style='display: none;' class='removeBtns' onclick='deleteCall("file","` + holdPath + `")' type="button">-</button><br/>`);
                }
            });

            res.write(`</div>`);
            
            res.write(`<div id='textbox' style='display: none;'">
                    <input id='dirName' type='text'></input>
                    <button id='postBtn' onclick='postBox()' type="button">+</button>
                    <button id='hideBtn' onclick='hideAddBox()' type="button">-</button>
                </div>`);
            res.write(`<div id='showBtn'>
                    <button type="button" onclick='showAddBox()'>Adicionar</button>
                    <button type="button" onclick='showRemoveBtns()'>Remover</button>
                </div><br/>`);
            res.write(`<script type="text/javascript" src="/page.js"></script>`);
            res.write(`<script src="http://code.jquery.com/jquery-2.0.0.min.js"></script>`);
            
            return res.end();
        });
    }    
})

app.post('/file', jsonParser, function(req, res){
    console.log("fileSent")
    console.log(req.body.file);
});

app.get('/file', function(req, res){
    const path = req.query.path;
    res.download(path);
});

app.delete('/file', function(req, res){
    const path = req.query.path;
    if (fs.existsSync(path)){
        fs.unlink(path, () => {
            res.status(200).json({stat: 'success', msg: 'Arquivo excluido'});
            return res.end();
        });            
    } else {
        res.status(200).json({stat: 'warn', msg: 'Arquivo não existente'});
        return res.end();
    }
});

app.listen(3030);