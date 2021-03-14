//require('newrelic');
// arm
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 808;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


let temp = '//127.0.0.1';

app.get('/ssrf', (req, res, next) =>{
    res.setHeader('Location', temp)
    res.statusCode= 301;
    res.send()
});
// short variant
app.use('/s', (req, res, next) =>{
    console.log(req.headers);
    console.log(JSON.stringify(req.body));
    res.setHeader('Location', temp)
    res.statusCode= 301;
    res.send();
});

app.post('/ssrf', (req, res, next) =>{
    temp = req.body.data || '/';
    console.log(temp);
    res.send(`Saved ${temp}`)
});

// rout witout response
app.use('/noresponse', (req, res) =>{
    console.log(req.headers)
    console.log(JSON.stringify(req.body))
});

app.use((req, res) => {
    const rMethod = req.method;
    const rUrl = req.url;
    const rHeaders = req.headers;
    console.info('START-------------------------------------------------------------\n'+rMethod + ' ' + rUrl);
    console.info(rHeaders);
    console.info('BODY--------------------------------------------------------------\n'+JSON.stringify(req.body));
    res.end(rUrl)
    console.info('END---------------------------------------------------------------\n\n\n');
});

app.listen(PORT, ()=>{
    console.log(`Server is working on ${PORT}`);
});
