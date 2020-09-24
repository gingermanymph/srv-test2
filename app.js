//require('newrelic');
// arm
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 808;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
    const rMethod = req.method;
    const rUrl = req.url;
    const rHeaders = req.headers;
    console.info('START-------------------------------------------------------------\n'+rMethod + ' ' + rUrl);
    console.info(rHeaders);
    console.info('BODY--------------------------------------------------------------\n'+JSON.stringify(req.body));
    res.statusCode = 301;
    res.setHeader('Location', 'https://srvcb.herokuapp.com/m0.html');
    res.send();
    console.info('END---------------------------------------------------------------\n\n\n');
});

app.listen(PORT, ()=>{
    console.log(`Server is working on ${PORT}`);
});
